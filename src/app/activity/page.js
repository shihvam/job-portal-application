import {fetchJobsForCandidateAction, fetchJobApplicationsForCandidate} from '@/actions'

import CandidateActivity from '@/components/candidate-activity';

import { currentUser } from '@clerk/nextjs/server';


async function Activity() {
  const user = await currentUser();
  const jobList = await fetchJobsForCandidateAction();
  const jobApplicants = await fetchJobApplicationsForCandidate(user?.id);


  return <CandidateActivity jobList = {jobList} 
  jobApplicants={jobApplicants}
  />
}

export default Activity;