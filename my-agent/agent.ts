import { LlmAgent } from "@google/adk";

export const rootAgent = new LlmAgent({
  name: "test_agent",
  model: "gemini-2.5-flash",
  instruction: "You are a helpful assistant. Reply briefly.",
});


// import {FunctionTool, LlmAgent} from "@google/adk";
// import {z} from "zod";

// const getCurrentTime = new FunctionTool({
//     name: "getCurrentTime",
//     description: "Returns current time in a specified city",
//     parameters: z.object({city: z.string().describe("The name of the city for which to retrieve the current time")}),
//     execute: ({city}) => {
//         console.log(`Tool Called with city ${city}.`)
//         return { status: "success", report: `the current time in the ${city} is 10:00 AM`}
//     }
// });

// export const rootAgent = new LlmAgent({
//     name: "hello_time_agent",
//     model: "gemini-1.5-flash",
//     description: "tells the current time is a specified city.",
//     instruction: "you are a helpful assistant that tells the current time in a specified city. use the getCurrentTime Tool for this purpose",
//     tools: [getCurrentTime]
// });