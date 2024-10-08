import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES, GET_USER_CHANNEL_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/contact-list";
import CreateChannel from "../contacts-container/components/create-channel/index";

export default function ContactsContainer() {
  const { setDirectMessagesContacts, directMessagesContacts, channels,setChannels } =
    useAppStore();
  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    const getChannels=async()=>{
      const response=await apiClient.get(GET_USER_CHANNEL_ROUTES,
        {withCredentials:true,}
      )
      if(response.data.channels){
        setChannels(response.data.channels);
      }
    }
    getContacts();
    getChannels();
  }, [setChannels,setDirectMessagesContacts]);
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>

        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden ">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Channels"} />
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden ">
          <ContactList contacts={channels} isChannel={true}/>
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
}

export const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg
        width="60px"
        height="60px"
        viewBox="0 0 24.00 24.00"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M10.0286 14.9426L9.54259 15.5139L10.0286 14.9426ZM12 9.50069L11.4641 10.0254C11.6052 10.1695 11.7983 10.2507 12 10.2507C12.2017 10.2507 12.3948 10.1695 12.5359 10.0254L12 9.50069ZM13.9714 14.9426L13.4855 14.3714L13.9714 14.9426ZM12 15.9939L12 15.2439H12L12 15.9939ZM10.5145 14.3714C9.93292 13.8766 9.34909 13.3035 8.91635 12.7109C8.47476 12.1061 8.25 11.562 8.25 11.1093H6.75C6.75 12.025 7.18465 12.8829 7.70492 13.5955C8.23403 14.3201 8.91448 14.9795 9.54259 15.5139L10.5145 14.3714ZM8.25 11.1093C8.25 10.0016 8.74454 9.41826 9.25333 9.22801C9.77052 9.03463 10.5951 9.13785 11.4641 10.0254L12.5359 8.97598C11.38 7.79544 9.95456 7.36438 8.72797 7.82302C7.49299 8.28481 6.75 9.53986 6.75 11.1093H8.25ZM14.4574 15.5139C15.0855 14.9795 15.766 14.3201 16.2951 13.5955C16.8154 12.8829 17.25 12.025 17.25 11.1093H15.75C15.75 11.562 15.5252 12.1062 15.0837 12.7109C14.6509 13.3036 14.0671 13.8766 13.4855 14.3714L14.4574 15.5139ZM17.25 11.1093C17.25 9.53985 16.507 8.2848 15.272 7.82302C14.0454 7.36438 12.62 7.79544 11.4641 8.97598L12.5359 10.0254C13.4049 9.13785 14.2295 9.03463 14.7467 9.22801C15.2555 9.41826 15.75 10.0016 15.75 11.1093H17.25ZM9.54259 15.5139C10.3221 16.177 10.9428 16.7439 12 16.7439L12 15.2439C11.586 15.2439 11.3828 15.11 10.5145 14.3714L9.54259 15.5139ZM13.4855 14.3714C12.6172 15.11 12.414 15.2439 12 15.2439L12 16.7439C13.0572 16.7439 13.6779 16.177 14.4574 15.5139L13.4855 14.3714Z"
            fill="#f94f43"
          ></path>
          <path
            d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
            stroke="#f94f43"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
        </g>
      </svg>
      <span className="text-3xl font-semibold playfair-display">SKY</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
