'use client'
  
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@radix-ui/react-scroll-area";
import CandidateList from "../candidate-list";


function JobApplicants({ 
    showApplicantsDrawer,
    setShowApplicantsDrawer, 
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
    currentCandidateDetails,
    setCurrentCandidateDetails, 
    jobItem, 
    jobApplications
  }) {
  return (<>

      <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer} >

        <DrawerContent className='max-h-[50vh]' >
          <ScrollArea className='h-auto overflow-y auto'>
            <CandidateList 
              currentCandidateDetails={currentCandidateDetails}
              setCurrentCandidateDetails={setCurrentCandidateDetails}
              jobApplications={jobApplications}
              showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
              setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
            />
          </ScrollArea>
          
        </DrawerContent>

      </Drawer>
      
      <div>
        
      </div>
    </>
  );

}

export default JobApplicants;