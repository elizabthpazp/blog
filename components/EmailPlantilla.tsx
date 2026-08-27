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
        className="seva-form formkit-form my-12 w-full max-w-2xl mx-auto relative rounded-3xl p-6 sm:p-10 backdrop-blur-xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-indigo-500/[0.05] border border-violet-500/20 shadow-xl overflow-hidden"
        method="post"
        data-sv-form="5918261"
        data-uid="474a39d80b" 
        data-version="5"
        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
        min-width="400 500 600 700 800"
        suppressHydrationWarning
      >
        <div data-style="minimal" className="relative z-10">
          <div
            className="formkit-header"
            data-element="header"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white tracking-tight">
              ✨ {title} ✨
            </h3>
          </div>

          <div
            className="formkit-subheader"
            data-element="subheader"
          >
            <p className="mt-3 mb-6 text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
              {description} 💜
            </p>
          </div>

          <ul
            className="formkit-alert formkit-alert-error"
            data-element="errors"
            data-group="alert"
          ></ul>

          <div
            data-element="fields"
            data-stacked="false"
            className="seva-fields formkit-fields flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-stretch"
          >
            <div className="formkit-field flex-1">
              <input
                className="formkit-input w-full px-4 py-3.5 rounded-2xl !bg-white dark:!bg-[#121520] border border-violet-500/20 dark:!border-white/10 text-gray-900 dark:!text-white placeholder:text-gray-400 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-200 text-sm shadow-inner"
                name="email_address"
                aria-label="Email Address"
                placeholder="Your Email Address"
                autoComplete="email"
                type="email"
                style={{ colorScheme: 'light dark' }}
              />
            </div>

            <button
              data-element="submit"
              className="formkit-submit px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md hover:shadow-violet-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              <div className="formkit-spinner">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span>{btnSubscribe}</span>
            </button>
          </div>

          <div
            className="formkit-guarantee mt-4"
            data-element="guarantee"
          >
          </div>
        </div>
      </form>
    </>
  );
}
