"use client";

import "../styles/newsletter.css";

export default function EmailPlantilla({
  title,
  description,
  error,
  thanks,
  incorrectEmail,
  thanksShort,
  btnSubscribe,
}: {
  title: string;
  description: string;
  error: string;
  thanks: string;
  incorrectEmail: string;
  thanksShort: string;
  btnSubscribe: string;
}) {
  
  return (
    <>
    <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
    <form
      action="https://app.convertkit.com/forms/5918261/subscriptions"
      className="seva-form formkit-form my-10"
      method="post"
      data-sv-form="5918261"
      data-uid="474a39d80b" 
      data-version="5"
      data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
      min-width="400 500 600 700 800"
      style={{ borderRadius: "35px" }}
      suppressHydrationWarning
    >
      <div
        className="formkit-background border-2 border border-gray-400 light:border-gray-400 dark:border-gray-700"
         
      ></div>
      <div data-style="minimal">
        <div
          className="formkit-header"
          data-element="header"
          style={{
            color: "rgb(83, 83, 83)",
            fontSize: "23px",
            fontWeight: "700",
          }}
        >
          <h1 className="mx-auto px-0 light:text-gray-800 text-center dark:text-white max-w-xl font-display text-3xl font-bold text-gray-800">
          ✨ {title} ✨</h1>
        </div>
        <div
          className="formkit-subheader"
          data-element="subheader"
          style={{ color: "rgb(51, 50, 50)", fontSize: "18px" }}
        >
          <p className="my-4 text-center px-0 mx-auto max-w-xl text-lg light:text-gray-600 dark:text-gray-400">{description} 💜</p>
        </div>
        <ul
          className="formkit-alert formkit-alert-error"
          data-element="errors"
          data-group="alert"
        ></ul>
        <div
          data-element="fields"
          data-stacked="false"
          className="seva-fields formkit-fields flex flex-row sm:flex-col xs:flex-col md:flex-row xl:flex-row lg:flex-row"
        >
          <div className="formkit-field">
            <input
              className="formkit-input input2 text-gray-800 light:text-gray-800 dark:text-white shadow-xl"
              name="email_address"
              aria-label="Email Address"
              placeholder="Your Email Address"
              autoComplete="email"
              type="email"
              style={{ 
                borderColor: "rgb(122, 91, 189)", 
                borderRadius: "20px",
                backgroundColor:'transparent'
              }}
            />
          </div>
          <button
            data-element="submit"
            className="formkit-submit formkit-submit"
            style={{
              color: "rgb(255, 255, 255)",
              backgroundColor: "rgb(124 58 237)",
              borderRadius: "1rem",
              fontWeight: "700",
            }}>
            <div className="formkit-spinner">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <span className="">{btnSubscribe}</span>
          </button>
        </div>
        <div
          className="formkit-guarantee"
          data-element="guarantee"
          style={{
            color: "rgb(77, 77, 77)",
            fontSize: "13px",
            fontWeight: "400",
          }}
        > 
        </div>
      </div>
    </form>
    </>
  );
}
