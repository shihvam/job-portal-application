'use client'

import { Fragment } from "react";
import JobApplicants from "../job-applicants";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getCandidateDetailsByIDAction, updateJobApplicationAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";
 

const supabaseClient = createClient('https://hzicuiciynpyzkcjpjjx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6aWN1aWNpeW5weXprY2pwamp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMTY5NzMsImV4cCI6MjA0Mzc5Mjk3M30.a7ewkPvOxLbctrfzOfclc70gY-XzCQT_EhEX7n8sr-Q');


function CandidateList({
  jobApplications, 
  currentCandidateDetails, 
  setCurrentCandidateDetails, 
  showCurrentCandidateDetailsModal, 
  setShowCurrentCandidateDetailsModal
}) {


  async function handleFetchCandidateDetails(getCurrentCandidateID) {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateID);

    console.log(data);
    if(data){
      setCurrentCandidateDetails(data)
      setShowCurrentCandidateDetailsModal(true)
    }  
  }

  
  function handlePreviewResume() {

    const {data} = supabaseClient.storage.from('job-board-public').getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    console.log(data);

    const a = document.createElement('a');
    a.href=data?.publicUrl;
    a.setAttribute('download','Resume.pdf');
    a.setAttribute('target','_blank');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  async function handleUpdateJobStatus(getCurrentStatus){
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(item => item?.candidateUserID ===  currentCandidateDetails?.userId);

    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant], 
      status : cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus)
    }
    console.log(jobApplicantsToUpdate);
    await updateJobApplicationAction(jobApplicantsToUpdate, '/jobs');
  }

  
  console.log(jobApplications);

  return (
    <Fragment>
      <div className='grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols03' >
        {
          jobApplications && jobApplications.length > 0 ? 

          jobApplications.map(JobApplicantItem => 
          
          <div className='bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4' > 
            <div className='px-4 my-6 flex justify-between items-center' >
              <h3 className='text-lg font-bold' > {JobApplicantItem.name} </h3>

              <Button onClick={ () => handleFetchCandidateDetails(JobApplicantItem?.candidateUserID)  } 
              className=' flex h-11 items-center justify-center px-5' > View Profile </Button>

            </div>
          </div>
        )  : null
        }
      </div>

        <Dialog open={showCurrentCandidateDetailsModal} onOpenChange={() => { setCurrentCandidateDetails(null); setShowCurrentCandidateDetailsModal(false) }}  >
          <DialogContent>
            
            <div >
              <div>
                <h1 className='text-2xl font-bold text-black'  > {currentCandidateDetails?.candidateInfo?.name} </h1> 

                <p  className='text-[18px] mt-2 font-medium text-black' > {currentCandidateDetails?.email} </p>
              </div>
              
              <br/>

              <ul>

                <li className='text-[18px] font-normal text-black'  > { `Current Company :  ${currentCandidateDetails?.candidateInfo?.currentCompany} `} </li>

                <li className='text-lg font-normal mt-1 text-black'  >  { `Current job location : ${ currentCandidateDetails?.candidateInfo?.cuurentJobLocation}` } </li>

                <li className='text-lg font-normal mt-1 text-black'  >  { `Current salary : ${ currentCandidateDetails?.candidateInfo?.currentSalary} LPA`  } </li>

                <li className='text-lg font-normal mt-1 text-black'  >  { `Current notice period : ${ currentCandidateDetails?.candidateInfo?.noticePeriod} days`  } </li>

                <li className='text-lg font-normal mt-1 text-black'  >  { `Total Experience : ${ currentCandidateDetails?.candidateInfo?.totalExperience} years`  } </li>

              </ul>

          
                <div className='flex items-center gap-4 mt-6 flex-wrap'  >
                <h1 className='text-[18px] font-medium text-black' > Previous Companies : </h1>

                  {currentCandidateDetails?.candidateInfo?.previousCompanies.split(',').map(company => 
                  <div className='w-[100px] flex justify-center items-center h-[35px] bg-gray-300 rounded-[4px]' >
                    <h2 className='text-[13px] font-bold text-gray-600' >  {company} </h2>
                  </div> )}
                </div>

                <div className='flex gap-4 mt-6 flex-wrap ' >
                <h1 className='text-[18px] font-medium ' > Skills : </h1>
                  {currentCandidateDetails?.candidateInfo?.skills.split(',').map(skillItem => 
                  <div className='w-[100px] flex justify-center items-center h-[35px] bg-white rounded-[4px] border-2' >
                    <h2 className='text-[13px] font-medium text-black' >  {skillItem} </h2> 
                  </div> )}
                  
                </div>
                <br/>
            </div>

            
            <div className='flex gap-3' >

              <Button onClick={handlePreviewResume}  
              className=' flex h-11 items-center justify-center px-5 outline-2' > Resume </Button>

              <Button onClick={() => handleUpdateJobStatus('Selected') } 
              className='disabled:opacity-65 flex h-11 items-center justify-center px-5'
              disabled={ 
                
                jobApplications.find(item => item?.candidateUserID === currentCandidateDetails?.userId)?.status.includes('Selected') || 
                jobApplications.find(item => item?.candidateUserID === currentCandidateDetails?.userId)?.status.includes('Rejected')  ? true : false }

              > 
              
              {
                jobApplications.find(item => item?.candidateUserID === currentCandidateDetails?.userId)?.status.includes('Selected')  ? 'Selected' : 'Select'
              }

              </Button>

              <Button onClick={() => handleUpdateJobStatus('Rejected') } 
              className=' disabled:opacity-65 flex h-11 items-center justify-center px-5'
              disabled={ 
                
                jobApplications.find(item => item?.candidateUserID === currentCandidateDetails?.userId)?.status.includes('Selected') ||
                jobApplications.find(item => item?.candidateUserID === currentCandidateDetails?.userId)?.status.includes('Rejected') ? true : false }
              > 
              {
                jobApplications.find(item => item?.candidateUserID === currentCandidateDetails?.userId)?.status.includes('Rejected')  ? 'Rejected' : 'Reject'
              }
               </Button>

            </div> 
         

          </DialogContent>

          

        </Dialog>

    </Fragment>
  )
}

export default CandidateList;