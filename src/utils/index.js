import qs from 'query-string';

export const recruiterOnBoardFormControls = [
  {
    label:'name',
    name:'name',
    placeholder:'Enter your name',
    componentType: 'input'
  },
  {
    label:'Company name',
    name:'companyName',
    placeholder:'Enter yoour company name',
    componentType: 'input'
  },
  {
    label:'Company Role',
    name:'companyRole',
    placeholder:'Enter your company role',
    componentType: 'input'
  }
]

export const initialRecruiterFormData = {
  name : '',
  companyName: '',
  companyRole: ''
}


export const candidateOnBoardFormControls = [
  {
    label:'Resume',
    name:'resume',
    componentType: 'file'
  },
  {
    label:'name',
    name:'name',
    placeholder:'Enter your name',
    componentType: 'input'
  },
  {
    label:'Current Company',
    name:'currentCompany',
    placeholder:'Enter your current company',
    componentType: 'input'
  },
  {
    label:'Current Job Location',
    name:'currentJobLocation',
    placeholder:'Enter your current job location',
    componentType: 'input'
  },
  {
    label:'Preferred Job Location',
    name:'preferredJobLocation',
    placeholder:'Enter your preferred job location',
    componentType: 'input'
  },
  {
    label:'Current Salary',
    name:'currentSalary',
    placeholder:'Enter your current salary',
    componentType: 'input'
  },
  {
    label:'Notice Period',
    name:'noticePeriod',
    placeholder:'Enter your notice period',
    componentType: 'input'
  },
  {
    label:'Skills',
    name:'skills',
    placeholder:'Enter your skills',
    componentType: 'input'
  },
  {
    label:'Previous Companies',
    name:'previousCompanies',
    placeholder:'Enter your previous companies',
    componentType: 'input'
  },
  {
    label:'Total Experience',
    name:'totalExperience',
    placeholder:'Enter your total experience',
    componentType: 'input'
  },
  {
    label:'College',
    name:'college',
    placeholder:'Enter your college',
    componentType: 'input'
  },
  {
    label:'College Location',
    name:'collegeLocation',
    placeholder:'Enter your college location',
    componentType: 'input'
  },
  {
    label:'Graduated year',
    name:'graduatedYear',
    placeholder:'Enter your graduated year',
    componentType: 'input'
  },
  {
    label:'Linkedin Profile',
    name:'linkedinProfile',
    placeholder:'Enter your linkedin profile',
    componentType: 'input'
  },
  {
    label:'Github',
    name:'githubProfile',
    placeholder:'Enter your github profile',
    componentType: 'input'
  },
]

export const initialCandidateFormData = {
  resume : '',
  name: '',
  currentJobLocation:'',
  preferredJobLocation:'',
  currentSalary:'',
  noticePeriod:'',
  skills:'',
  currentCompany:'',
  previousCompanies:'',
  totalExperience:'',
  college:'',
  collegeLocation:'',
  graduatedYear:'',
  githubProfile:'',
  linkedinProfile:'',
}


export const initialCandidateAccountFormData = {
  name: '',
  currentJobLocation:'',
  preferredJobLocation:'',
  currentSalary:'',
  noticePeriod:'',
  skills:'',
  currentCompany:'',
  previousCompanies:'',
  totalExperience:'',
  college:'',
  collegeLocation:'',
  graduatedYear:'',
  githubProfile:'',
  linkedinProfile:'',
}

export const postNewJobFormControls = [
  {
    label : 'Company Name',
    name : 'companyName',
    placeholder : 'Company Name',
    componentType: 'Input',
    disabled: true,
  },
  {
    label : 'Title',
    name : 'title',
    placeholder : 'Job Title',
    componentType: 'Input'
  },
  {
    label : 'Type',
    name : 'type',
    placeholder : 'Job Type',
    componentType: 'Input'
  },
  {
    label : 'Location',
    name : 'location',
    placeholder : 'Job Location',
    componentType: 'Input'
  },
  {
    label : 'Experience',
    name : 'experience',
    placeholder : 'Experience',
    componentType: 'Input'
  },
  {
    label : 'Description',
    name : 'description',
    placeholder : 'Description',
    componentType: 'Input'
  },
  {
    label : 'Skills',
    name : 'skills',
    placeholder : 'Skills',
    componentType: 'Input'
  },
]

export const initialPostNewJobFormData  = {
  companyName : '',
  title:'',
  type: '',
  location : '',
  experience  : '',
  description : '',
  skills : ''
}

export const filterMenuDataArray = [
  {
    id: 'companyName',
    label: 'Company Name'
  },{
    id: 'title',
    label: 'Title'
  },{
    id: 'type',
    label: 'Type'
  },{
    id: 'location',
    label: 'Location'
  }
]


export function formUrlQuery({params, dataToAdd}){
  let currentURL = qs.parse(params);

  if(Object.keys(dataToAdd).length > 0){
    Object.keys(dataToAdd).map(key => {
      if(dataToAdd[key].length === 0) delete currentURL[key];
      else currentURL[key] = dataToAdd[key].join(",")
    } )
  }

  return qs.stringifyUrl({
    url : window.location.pathname,
    query: currentURL,
  },{
    skipNull : true,
  })
}


export const membershipPlans = [
  {
    heading : 'Tier 1',
    price : 100,
    type : 'basic',
  },{
    heading : 'Tier 2',
    price : 1000,
    type : 'teams',
  },{
    heading : 'Tier 3',
    price : 100,
    type : '5000',
  }
]