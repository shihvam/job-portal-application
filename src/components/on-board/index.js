'use client'

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import CommonForm from "../common-form";
import { candidateOnBoardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnBoardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";


const supabaseClient = createClient('https://hzicuiciynpyzkcjpjjx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6aWN1aWNpeW5weXprY2pwamp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMTY5NzMsImV4cCI6MjA0Mzc5Mjk3M30.a7ewkPvOxLbctrfzOfclc70gY-XzCQT_EhEX7n8sr-Q');


function OnBoard(){

  const [currentTab, setCurrentTab] = useState('candidate');

  const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);

  const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);

  const [file, setFile] = useState(null);

  const currentAuthUser = useUser();

  const {user} = currentAuthUser;

  function handleFileChange(event) {
    event.preventDefault()
    setFile(event.target.files[0]);
  }

  async function handleUploadPdfToSupabase() {
    const {data, error} = await supabaseClient.storage.from('job-board-public').upload( `/public/${file.name}`, file, {cacheControl : '3600', upsert: false});


    if(data) {
      setCandidateFormData({...candidateFormData, resume : data.path,})
    }
   }

  useEffect( () => {
    if(file) handleUploadPdfToSupabase()
  }, [file] )
  

  function handleTabChange(value){
    setCurrentTab(value);
  }

  function handleRecruiterFormValid(){
    return  Object.keys(recruiterFormData).every(key => recruiterFormData[key].trim() !== '' );
  };

  
  function handleCandidateFormValid() {
    return Object.keys(candidateFormData).every(key => 
      candidateFormData[key].trim() !== '');
  }


  async function createProfile(){
    const data = currentTab === 'candidate' ? 
    
    {
      candidateInfo : candidateFormData,
      role : 'candidate',
      isPremiumUser : false,
      userId : user?.id,
      email : user?.primaryEmailAddress?.emailAddress
    }

    : {
      recruiterInfo: recruiterFormData,
      role : 'recruiter',
      isPremiumUser : false,
      userId : user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
    };

    await createProfileAction(data, '/onboard');
  }


  return (
    <div className="bg-white " > 
    <Tabs value={currentTab} onValueChange={handleTabChange} > 
      <div  className="w-full " >
        <div className="flex items-baseline justify-between border-b pb-6 pt-24" >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900" > Welcome to onboarding </h1>
          <TabsList>  
            <TabsTrigger value = 'candidate' > Candidate </TabsTrigger>
            <TabsTrigger value = 'recruiter' > Recruiter </TabsTrigger>
          </TabsList>
        </div>
      </div>
      <TabsContent value="candidate" >
        <CommonForm
            formControls={candidateOnBoardFormControls}
            buttonText={'Onboard as candidate'}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            handleFileChange={handleFileChange}
            isBtnDisabled={ () =>  !handleCandidateFormValid()}
            action={createProfile}
        />
      </TabsContent>

      <TabsContent value="recruiter" > 

        <CommonForm 
                formControls={recruiterOnBoardFormControls}
                buttonText={'Onboard as recruiter'}
                formData={recruiterFormData}
                setFormData={setRecruiterFormData}
                isBtnDisabled={ () => !handleRecruiterFormValid()}
                action={createProfile}
                > 
        </CommonForm>  

      </TabsContent>
    </Tabs>
   </div>
  );
}

export default OnBoard;