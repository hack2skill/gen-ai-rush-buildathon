import http from "./http-common-servicecall";

class ServiceCall {
  generateIdeaDetails(ideaDetails) {
    return http.post("/generateIdeaDetails", ideaDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  generateProblemStatement(elaboratedIdeaDetails) {
    return http.post("/generateProblemStatement", elaboratedIdeaDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  generateProposedSolution(ideaProblemDetails) {
    return http.post("/generateProposedSolution", ideaProblemDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  generateInnovationModules(ideaProblemSolutionDetails) {
    return http.post("/generateInnovationModules", ideaProblemSolutionDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  generateMarketResearch(backgroundData) {
    return http.post("/generateMarketResearch", backgroundData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  generateKeyProblems(marketData) {
    return http.post("/generateKeyProblems", marketData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  generateUserStakeholders(backgroundMarketData) {
    return http.post("/generateUserStakeholders", backgroundMarketData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  userSignUp(userDetails) {
    return http.post("/addUser", userDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  userSignIn(userLoginDetails) {
    return http.post("/login", userLoginDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  addProject(projectDetails) {
    return http.post("/addProject", projectDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getProject(id) {
    return http.get("/getProject/" + id, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getAllProjects() {
    return http.get("/getAllProjects", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getSearchProjects(searchData) {
    let data = new FormData();
    data.append("keyword", searchData);
    return http.post("/getSearchProjects", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new ServiceCall();
