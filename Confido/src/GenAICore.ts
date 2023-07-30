import {
  fetchAllPatientAppointmentsFromFb,
  fetchClinicDetailsFromFb,
  fetchPatientAssignedWorkflowFromFb,
  fetchPatientFromFb,
} from '../Utilities/FirestoreServices';
import {
  Variable,
  WorkflowTask,
  defaultClinicDetails,
  defaultPatient,
  defaultWorkflow,
} from '../shared/FirestoreInterfaces';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/document';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';
import { defineString } from 'firebase-functions/v2/params';

export const replyToPatientWithContext = async (
  patientUid: string,
  incomingMessage: string
) => {
  const openAiApiKey = defineString('OPENAI_API', { default: '' });

  if (!openAiApiKey.value()) {
    return '';
  }

  // Fetch all relevant data
  let clinicDetails = await fetchClinicDetailsFromFb();
  if (!clinicDetails) {
    clinicDetails = { ...defaultClinicDetails };
  }

  let patient = await fetchPatientFromFb(patientUid);
  if (!patient) {
    patient = { ...defaultPatient };
  }

  let appointments = await fetchAllPatientAppointmentsFromFb(patientUid);
  if (!appointments) {
    appointments = [];
  }

  let currentAssignedWorkflows = null;
  const surgeryTasks: any[] = [];
  const surgeryDetails = new Map();
  if (patient.currentAssignedWorkflowUid) {
    currentAssignedWorkflows = await fetchPatientAssignedWorkflowFromFb(
      patientUid,
      patient.currentAssignedWorkflowUid
    );
  }
  if (!currentAssignedWorkflows) {
    currentAssignedWorkflows = { ...defaultWorkflow };
  }

  currentAssignedWorkflows.surgeryDetails.variables.forEach(
    (variable: Variable) => surgeryDetails.set(variable.name, variable.value)
  );

  currentAssignedWorkflows.workflowTasks.forEach((task: WorkflowTask) => {
    surgeryTasks.push({
      name: task.name,
      timeline: task.timeline,
      message: task.patientMessageContent,
    });
  });

  // Build document array
  const docs = [
    new Document({ pageContent: JSON.stringify(clinicDetails) }),
    new Document({ pageContent: JSON.stringify(patient) }),
    ...currentAssignedWorkflows.surgeryDetails.variables.map(
      (variable: Variable) => {
        return new Document({ pageContent: JSON.stringify(variable) });
      }
    ),
    ...appointments.map((appointment) => {
      return new Document({ pageContent: JSON.stringify(appointment) });
    }),
    ...surgeryTasks.map((task: any) => {
      return new Document({ pageContent: JSON.stringify(task) });
    }),
  ];

  // Convert to Vector store
  const embeddingsModel = new OpenAIEmbeddings({
    openAIApiKey: openAiApiKey.value(),
  });
  const vectorStore = await HNSWLib.fromDocuments(docs, embeddingsModel);
  console.log(vectorStore);

  const retreiver = vectorStore.asRetriever(40);
  console.log(retreiver);

  // Initialize LLM
  const llm = new ChatOpenAI({
    openAIApiKey: openAiApiKey.value(),
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  });
  console.log(llm);

  // Setup retreival chain
  const retreivalChain = new RetrievalQAChain({
    retriever: retreiver,
    combineDocumentsChain: loadQAStuffChain(llm),
    verbose: true,
  });
  console.log(retreivalChain);

  // Run the input message through the chain
  const reply = await retreivalChain.run(incomingMessage);
  console.log(reply);

  return reply;
};
