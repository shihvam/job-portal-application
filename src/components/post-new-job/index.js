'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Toast } from "../ui/toast";
import Link from "next/link";

function PostNewJob({user, profileInfo, jobList}){

  const [membershipPopup, setMembershipPopup] = useState(false);

  const router = useRouter();

  const {toast} = useToast();

  function handleMembership(){

    if( !profileInfo?.isPremiumUser && jobList.length > 4 ) {
      
      setMembershipPopup(true);

      toast({
        variant : 'destructive',
        title : " You can post max 2 jobs",
        description : "Please opt for membership to post more jobs",
        action : <Link href={'/membership'} > Choose membership </Link>
      })

      redirect('/membership')

    } else {
      setShowJobDialog(true);
    }
  }


  const [showJobDialog, setShowJobDialog] = useState(false);

  const [jobFormData, setJobFormData] = useState({...initialPostNewJobFormData, companyName: profileInfo?.recruiterInfo?.companyName});

  function handlePostNewBtnValid(){

    console.log(jobFormData);

    jobFormData == undefined? '' :  Object.keys(jobFormData).every( control => jobFormData[control].trim() !== '' ) ;

    
  }

  async function createNewJob(){
    await postNewJobAction({...jobFormData, recruiterId : user?.id, applicants : []}, '/jobs');
    setJobFormData({...initialPostNewJobFormData, companyName: profileInfo?.recruiterInfo?.companyName});
    setShowJobDialog(false);
  }

  return(
    <div>
      <Button className='disabled:opacity-65 flex h-11 items-center justify-center px-5' 
       onClick={() => handleMembership()} 
      > Post A Job </Button>


      <Dialog open={showJobDialog} onOpenChange={() => {
        
        setShowJobDialog(false)
        setJobFormData({...initialPostNewJobFormData, companyName : profileInfo?.recruiterInfo?.companyName}) 
      }} >

        <DialogContent className='sm:max-w-screen-md h-[600px] overflow-auto' >
          <DialogHeader>
            <DialogTitle> Post New Job </DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={'Add'}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                // isBtnDisabled={!handlePostNewBtnValid()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="h-10 w-10 " >
      <Dialog open={false} onOpenChange={() => { 
        setMembershipPopup(false)
      }} >

        <DialogContent className='sm:max-w-screen-md h-[200px] overflow-auto' >
          <DialogHeader className='mb-6'>
            <DialogTitle> Upgrade to membership </DialogTitle>
          
            
          <DialogDescription className='m-9 ml-0 justify-center items-center' >
            Oops! You need to upgrade to your membership to keep posting your jobs!
            <Button onClick={ () => router.push('/membership') } className='disabled:opacity-65 flex h-11 items-center justify-center px-5' > Upgrade Membership </Button>
          </DialogDescription>
          </DialogHeader>
              
        </DialogContent>
      </Dialog>
    </div>
      
    </div>
  );
}

export default PostNewJob;