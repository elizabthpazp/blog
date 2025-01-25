interface SiteData { 
  url: string;  
  confirmEmail: boolean;
  inputFeedback?: {
    emailSuccess?: string;
    noEmailSuccess?: string;
    incorrectEmail?: string;
    error?: string;
  };
}

const siteData: SiteData = {  
  url: "https://blog.elijs.dev",  
  confirmEmail: true,
};

export default siteData;
