'use server'

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";


const stripe = require('stripe')('sk_test_51QErOaDfE2BaMXMy9j7kfwMq1sehVwXJ49ULUkxdbOuMaYEPxFqw6bzQ6eEWeftUflvcLedoDX6VQGhjx74i7Nim00LeIsLWkA')


//create profile action

export async function createProfileAction(formData, pathToRevalidate){
  await connectToDB();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}



export async function fetchProfileAction(id) {
  await connectToDB();
  const result = await Profile.findOne({userId : id });
 
  return JSON.parse(JSON.stringify(result));
};


//create job action

export async function postNewJobAction(formData, pathToRevalidate) {
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate);
}

//fetch job action

//recruiter

export async function fetchJobsForRecruiterAction(id){
  await connectToDB();
  const result = await Job.find({recruiterId : id});
  return JSON.parse(JSON.stringify(result));
}


//candidate

export async function fetchJobsForCandidateAction(filterParams = {}) {
  await connectToDB();
  let updatedParams = {};
  Object.keys(filterParams).forEach(filterKey => {
    updatedParams[filterKey] = {$in : filterParams[filterKey].split(',')}
  })

  console.log(updatedParams, 'updatedParams');
  console.log(filterParams, 'filterParams')
  const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {} );
  return JSON.parse(JSON.stringify(result));
}


//create job application
export async function createJobApplicationAction(data, pathToRevalidate){
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}


//fetch job applications - candidate

export async function fetchJobApplicationsForCandidate(candidateID){
  await connectToDB();
  const result = await Application.find({candidateUserID : candidateID});
  return JSON.parse(JSON.stringify(result))
}


//fetch job application - recruiter

export async function fetchJobApplicationsForRecruiter(recruiterID){
  await connectToDB();
  const result = await Application.find({recruiterUserID : recruiterID});
  return JSON.parse(JSON.stringify(result));
}

//update job application 

export async function updateJobApplicationAction(data,pathToRevalidate){

  await connectToDB();
  const {recruiterUserID, name, email, candidateUserID, status, jobID, _id, jobAppliedDate } = data;

  await Application.findOneAndUpdate({
    _id : _id,
  }, {
    recruiterUserID,
    name, email, candidateUserID, status, jobID, jobAppliedDate
  }, {new : true});

  revalidatePath(pathToRevalidate);
  
}


//get candidate details by candidate id

export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDB();
  const result = await Profile.findOne({ userId : currentCandidateID })
  return JSON.parse(JSON.stringify(result));
}


//create filter categories

export async function createFilterCategoryAction() {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
}


//update Profile Action

export async function updateProfileAction(data, pathToRevalidate){
  await connectToDB();
  
  const {userId, role, email, isPremiumUser, memberShipType, memberShipStartDate, memberShipEndDate, recruiterInfo, candidateInfo, _id} = data;

  await Profile.findOneAndUpdate({
    _id: _id
  },{
    userId, role, email, isPremiumUser, memberShipType, memberShipStartDate, memberShipEndDate, recruiterInfo, candidateInfo
  },{new: true})

  revalidatePath(pathToRevalidate);
}


//create stripe price id based on tier selection

export async function createPriceIdAction(data){
  const session = await stripe.prices.create({
    currency : 'inr',
    unit_amount : data?.amount * 100,
    recurring : {
      interval : 'year'
    }, 
    product_data : {
      name : 'Premium Plan'
    }
  })

  return {
    success : true,
    id : session?.id,
  }
}




//create payment logic

export async function createStripePaymentAction(data){
  const session = await stripe.checkout.sessions.create({
    payment_method_types : ['card'],
    line_items : data?.lineItems,
    mode : 'subscription',
    success_url : 'http://localhost:3000/membership' + "?status=success",
    cancel_url : 'http://localhost:3000/membership' + '?status=cancel'
  });

  return {
    success: true,
    id : session?.id,
  }
}