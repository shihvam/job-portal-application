

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function CommonCard({icon, title, description, footerContent, appliedDate, finalFilteredItem}){


  return (
    <Card className='flex bg-gray-100 flex-col gap-6 rounded-2xl p-8 transition duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer' >

      <CardHeader className='p=0 ' >

      <div className="flex flex-row justify-between" >
        { icon? icon : <p> icon </p> }

        { appliedDate? <p> {appliedDate} </p> : null }
        </div>

       {title ? <CardTitle className='text-xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-gray-950' > {title} </CardTitle> : <p> title </p> }

       {description ? <CardDescription className='mt-3 text-gray-600' > {description} </CardDescription> : <p> description </p> }

      </CardHeader>

      <CardFooter className='p-0' > {footerContent} </CardFooter>

    </Card>
  )
}

export default CommonCard;