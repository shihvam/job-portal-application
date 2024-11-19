import {mongoose} from 'mongoose'

const connectToDB = async () => {
  const connectionURL = 'mongodb+srv://shihvam01:Shivam%40123@cluster0.egki5.mongodb.net/';
   mongoose.connect(connectionURL).then(() => console.log('Job board database connection is successfull')).catch( error => console.log(`error  ${error}`)
   )
}

export default connectToDB;