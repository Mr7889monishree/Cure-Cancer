import React, { useState } from 'react'
import { IconChevronRight, IconFileUpload, IconProgress } from '@tabler/icons-react'
import RecordDetailsHeader from './Component/RecordDetailsHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import FileUploadModal from './Component/FileUploadModal'
import { useStateContext } from '../../context/Index'
import {GoogleGenerativeAI} from '@google/generative-ai'
import Markdown from 'react-markdown'
//after the user click on the record this page will appear the details in that record
//contains most of the function to make the communication with gemini AI to analyze patient records
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY//way to import environment variable in js code
const SingleRecordDetails = () => {
  const {state} = useLocation();
  const navigate = useNavigate();// when click on view treatment plan to navigate
  const [file,setFile] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [uploadSuccess,setUploadSuccess] = useState(false);
  const [processing,setProcessing] = useState(false);// track the process of ai analaysis
  const [analysisResult,setAnalysisResult] = useState(
    state.analysisResult || "",
  )  
  const [filename,setFileName] = useState("");
  const [filetype,setFileType] = useState('');
  //state the control the model visibility
  const [isModalOpen,setIsModalOpen] = useState(false);
  //once ai give the analysis result it should be updated in the record analysis result
  const {updateRecord} = useStateContext(); 
  const handleOpenModal=()=>{
    setIsModalOpen(true);
  };
  const handleCloseModal=()=>{
    setIsModalOpen(false);
  };
  const handelFileChange=(e)=>{
    const file = e.target.files[0];
    setFileType(file.type);
    setFileName(file.name);
    setFile(file);
  };
  //gemini ai code for analysis result
  //base64 encoded format - text based string format (JSON)
  const readFileAsBase64 = (file)=>{
    return new Promise((resolve,reject)=>{
      const reader= new FileReader();//reads the file and cinverts them into a base64 text string format as that will be easy to be sent in the http port as for web request and for safety purpose 
      reader.onload=()=> resolve(reader.result.split(',')[1]);//here the file will be received as a URL which will be then split to take the base64 encoded part to the system or gemini ai which will be received through a API or via HTTP also to the GEMINI AI
      //if inbetweenn there is any error then the error will be triggered and the work load will be rejected or stopped
      reader.onerror = reject;
      reader.readAsDataURL(file);// this will read the data which is gemni ai and convert back to text or pdf and anakyse content and give the report as result
    })
  }
  //for handling file upload
  const handelfileupload=async()=>{
    setUploading(true); //to show the spinner for the better user experience
    setUploadSuccess(false);

    const genAI = new GoogleGenerativeAI(geminiApiKey);//api key connected with the code
    try {
      //for returning inline data for our model
      const base64Data = await readFileAsBase64(file);// read teh text based string converted file here for that we use this function of readFileAsBase64 method
      //to analyse the image parts in detail which is in text based string to convert and analyze it like image patterns and doc content like that
      const imageParts=[
        {
          inlineData:{
            data:base64Data,
            mimeType:file.type, 
          },
        },
      ];
      //to create a model out of that API key to analyse the result and give itas text
      //getGenerativeModel accepts the object 
      const model =genAI.getGenerativeModel({ model: 'gemini-1.5-pro' }); //creating model
      const prompt=`You are a highly knowledgeable and compassionate medical AI specializing in cancer and other complex diseases. You analyze medical reports and use current clinical best practices to generate detailed, personalized treatment plans.

                    When generating your response:

                    Explain the recommended treatment plan in clear, easy-to-understand language.

                    Break down the explanation into organized paragraphs for better readability.

                    Avoid medical jargon unless necessary — and explain it when used.

                    Make sure the tone is supportive and reassuring, as you are guiding a real patient.

                    Base your suggestions on the most accurate and up-to-date medical knowledge.

                    Your goal is to provide a thorough and personalized treatment plan that the patient (or their caregiver) can easily read, understand, and take action on.`;


      //image parts can have multiple inline objects
      const results= await model.generateContent([prompt,...imageParts]);

      //to get response
      const response = results.response;//response given by the AI
      //get text from the response give by AI
      const text= response.text(); //taking the result and giving it as a text
      //set the final analysis result
      setAnalysisResult(text);
      //now we will update the record with the analysis result
      await updateRecord({
        documentId:state.id,
        analysisResult: text , //whatever text given from google generative AI
        kanbanRecords: "",
      });
      setUploadSuccess(true);
      setIsModalOpen(false);
      setFileName("");
      setFile(null);
      setFileType("");
    } catch (error) {
      console.error('Error Uploading file',error);
      setUploadSuccess(false);
      setIsModalOpen(false);// closes the modal
    }
    finally{
      //after uploading and all are over make the uploading which gives the spinner to stop 
      setUploading(false);
    }
  }
  const processTreatmentPlan = async () => {
    setProcessing(true);

    const genAI = new GoogleGenerativeAI(geminiApiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Your role and goal is to be an that will be using this treatment plan ${analysisResult} to create Columns:
                - Overdue: Tasks that need to be started
                - Doing: Tasks that are in progress
                - Done: Tasks that are completed
          
                Each task should include a brief description. The tasks should be categorized appropriately based on the stage of the treatment process.
          
                Please provide the results in the following  format for easy front-end display no quotating or what so ever just pure the structure below:

                {
                  "columns": [
                    { "id": "overdue", "title": "Todo" },
                    { "id": "doing", "title": "Work in progress" },
                    { "id": "done", "title": "Done" }
                  ],
                  "tasks": [
                    { "id": "1", "columnId": "overdue", "content": "Example task 1" },
                    { "id": "2", "columnId": "overdue", "content": "Example task 2" },
                    { "id": "3", "columnId": "doing", "content": "Example task 3" },
                    { "id": "4", "columnId": "doing", "content": "Example task 4" },
                    { "id": "5", "columnId": "done", "content": "Example task 5" }
                  ]
                }
                            
                `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const parsedResponse = JSON.parse(text);
    await updateRecord({
      documentId: state.id,
      kanbanRecords: text,
    });
    navigate("/screening-schedules", { state: parsedResponse });
    setProcessing(false);
  };
  
  
  
  return (
    <div className='flex flex-wrap gap-6 p-4 md:p-6'>
      <button
        type='button'
        onClick={handleOpenModal}
        className='mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800'
      >
        <IconFileUpload />
        Upload Reports
      </button>
  
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileChange={handelFileChange}
        onFileUpload={handelfileupload}
        uploading={uploading}
        uploadSucess={uploadSuccess}
        filename={filename}
      />
  
      <RecordDetailsHeader recordName={state.recordName} />
  
      <div className='w-full'>
        <div className='flex flex-col'>
          <div className='-m-1.5 overflow-x-auto'>
            <div className='inline-block min-w-full p-1.5 align-middle'>
              <div className='overflow-hidden rounded-xl border border-neutral-700 bg-[#13131a] shadow-sm'>
                <div className='border-b border-neutral-700 px-4 py-4 sm:px-6'>
                  <h2 className='text-xl sm:text-2xl font-semibold text-neutral-200'>
                    Personalized AI-Driven Treatment Plan
                  </h2>
                  <p className='text-sm text-neutral-400'>
                    A tailored medical strategy leveraging advanced AI inside
                  </p>
                </div>
                <div className='flex w-full flex-col px-4 py-4 sm:px-6 text-white'>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">
                      Analysis Result
                    </h2>
                    <div className='space-y-4 text-sm sm:text-md text-neutral-100'>
                      <Markdown>{analysisResult}</Markdown>
                    </div>
                  </div>
                </div>
                <div className='m-4 flex flex-col gap-3 sm:flex-row sm:items-center'>
                  <button
                    type='button'
                    onClick={processTreatmentPlan}
                    className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                  >
                    View Treatment Plan 
                    <IconChevronRight size={20} />
                    {processing && (
                      <IconProgress size={20} className="animate-spin" />
                    )}
                  </button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default SingleRecordDetails