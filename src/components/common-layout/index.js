import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";


async function CommonLayout({children}) {

  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  return(
    <div className="mx-auto max-w-7xl p-6 lg:px-8" >
      {/*Header component*/}
      <Header user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} />
       {/*Header component*/}


      {/*Main Content*/}
      <main> {children} </main>
      {/*Main Content*/}

    </div>
  )
}

export default CommonLayout;
