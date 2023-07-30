const personalityMoodMapping = {
    Openness: {
      Happy: "Creative Expression",
      Sad: "Self-Exploration",
      Bored: "Novelty-seeking",
      Excited: "Embrace New Experiences",
      Angry: "Art Therapy",
      Fearful: "Exposure Therapy",
    },
    Conscientiousness: {
      Happy: "Goal Setting",
      Sad: "Problem-Solving",
      Bored: "Time Management",
      Excited: "Achievement",
      Angry: "Anger Management",
      Fearful: "Cognitive Restructuring",
    },
    Extraversion: {
      Happy: "Social Interaction",
      Sad: "Social Support",
      Bored: "Engaging Activities",
      Excited: "Energetic Behaviors",
      Angry: "Assertiveness Training",
      Fearful: "Systematic Desensitization",
    },
    Agreeableness: {
      Happy: "Empathy",
      Sad: "Emotional Expression",
      Bored: "Exploring Interests",
      Excited: "Shared Excitement",
      Angry: "Conflict Resolution",
      Fearful: "Relaxation Techniques",
    },
    "Neuroticism (Emotional Stability)": {
      Happy: "Positive Coping",
      Sad: "Grief Counseling",
      Bored: "Mindfulness",
      Excited: "Mindful Excitement",
      Angry: "Anger Management",
      Fearful: "Exposure Therapy",
    },
  };
  
  // Example usage:
  const personalityTrait = "Openness";
  const mood = "Happy";
  const technique = personalityMoodMapping[personalityTrait][mood];
//   console.log(`For ${personalityTrait} personality trait and ${mood} mood, use: ${technique}`);
  module.exports = personalityMoodMapping;