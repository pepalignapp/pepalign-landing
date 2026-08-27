import { useState, useRef, useEffect } from "react";

const FORM_HTML = `<style>@import url('https://fonts.googleapis.com/css2?family=Inter,family=Montserrat,family=Open+Sans&display=swap');</style><div class="newsletter-form-container"><form class="newsletter-form" action="https://app.loops.so/api/newsletter-form/cmt6au6l206o60jzh7byl7ius" method="POST" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;"><input class="newsletter-form-input" placeholder="you@example.com" required="" type="email" name="newsletter-form-input" style="font-family: Inter, sans-serif; color: rgb(0, 0, 0); font-size: 14px; margin: 0px 0px 10px; width: 100%; max-width: 300px; min-width: 100px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 213, 219); box-sizing: border-box; box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px; border-radius: 6px; padding: 8px 12px;"><button type="submit" class="newsletter-form-button" style="background: rgb(1, 112, 103); font-size: 15px; color: rgb(255, 255, 255); font-family: Montserrat, sans-serif; display: flex; width: 100%; max-width: 300px; white-space: normal; height: 38px; align-items: center; justify-content: center; flex-direction: row; padding: 9px 17px; box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px; border-radius: 6px; text-align: center; font-style: normal; font-weight: 500; line-height: 20px; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer;">Join Waitlist</button><button type="button" class="newsletter-loading-button" style="background: rgb(1, 112, 103); font-size: 15px; color: rgb(255, 255, 255); font-family: Montserrat, sans-serif; display: none; width: 100%; max-width: 300px; white-space: normal; height: 38px; align-items: center; justify-content: center; flex-direction: row; padding: 9px 17px; box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px; border-radius: 6px; text-align: center; font-style: normal; font-weight: 500; line-height: 20px; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; cursor: pointer;">Please wait...</button></form><div class="newsletter-success" style="display: none; align-items: center; justify-content: center; width: 100%;"><p class="newsletter-success-message" style="font-family: 'Open Sans', sans-serif; color: rgb(255, 255, 255); font-size: 14px;">You're on the list! Keep an eye on your inbox for early access.</p></div><div class="newsletter-error" style="display: none; align-items: center; justify-content: center; width: 100%;"><p class="newsletter-error-message" style="font-family: 'Open Sans', sans-serif; color: rgb(185, 28, 28); font-size: 14px;">Oops! Something went wrong, please try again</p></div>
<button 
class='newsletter-back-button'
type='button' 
style='color:#6b7280;font: 14px, Inter, sans-serif;margin:10px auto;text-align:center;display:none;background:transparent;border:none;cursor:pointer'
onmouseout='this.style.textDecoration="none"' 
onmouseover='this.style.textDecoration="underline"'>
&larr; Back
</button>
</div>`;

const FORM_SCRIPT = `
function submitHandler(event) {
  event.preventDefault();
  var container = event.target.parentNode;
  var form = container.querySelector(".newsletter-form");
  var formInput = container.querySelector(".newsletter-form-input");
  var success = container.querySelector(".newsletter-success");
  var errorContainer = container.querySelector(".newsletter-error");
  var errorMessage = container.querySelector(".newsletter-error-message");
  var backButton = container.querySelector(".newsletter-back-button");
  var submitButton = container.querySelector(".newsletter-form-button");
  var loadingButton = container.querySelector(".newsletter-loading-button");
  

  const rateLimit = () => {
    errorContainer.style.display = "flex";
    errorMessage.innerText = "Too many signups, please try again in a little while";
    submitButton.style.display = "none";
    formInput.style.display = "none";
    backButton.style.display = "block";
  }

  // Compare current time with time of previous sign up
  var time = new Date();
  var timestamp = time.valueOf();
  var previousTimestamp = localStorage.getItem("loops-form-timestamp");

  // If last sign up was less than a minute ago
  // display error
  if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
    rateLimit();
    return;
  }
  localStorage.setItem("loops-form-timestamp", timestamp);

  submitButton.style.display = "none";
  loadingButton.style.display = "flex";

  var formBody = "userGroup=&mailingLists=&email=" 
    + encodeURIComponent(formInput.value)
    ;

  fetch(event.target.action, {
    method: "POST",
    body: formBody,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => [res.ok, res.json(), res])
    .then(([ok, dataPromise, res]) => {
      if (ok) {
        // If response successful
        // display success
        success.style.display = "flex";
        form.reset();
      } else {
        // If response unsuccessful
        // display error message or response status
        dataPromise.then(data => {
          errorContainer.style.display = "flex";
          errorMessage.innerText = data.message
            ? data.message
            : res.statusText;
        });
      }
    })
    .catch(error => {
      // check for cloudflare error
      if (error.message === "Failed to fetch") {
        rateLimit();
        return;
      }
      // If error caught
      // display error message if available
      errorContainer.style.display = "flex";
      if (error.message) errorMessage.innerText = error.message;
      localStorage.setItem("loops-form-timestamp", '');
    })
    .finally(() => {
      formInput.style.display = "none";
      loadingButton.style.display = "none";
      backButton.style.display = "block";
    });
}
function resetFormHandler(event) {
  var container = event.target.parentNode;
  var formInput = container.querySelector(".newsletter-form-input");
  var success = container.querySelector(".newsletter-success");
  var errorContainer = container.querySelector(".newsletter-error");
  var errorMessage = container.querySelector(".newsletter-error-message");
  var backButton = container.querySelector(".newsletter-back-button");
  var submitButton = container.querySelector(".newsletter-form-button");

  success.style.display = "none";
  errorContainer.style.display = "none";
  errorMessage.innerText = "Oops! Something went wrong, please try again";
  backButton.style.display = "none";
  formInput.style.display = "flex";
  submitButton.style.display = "flex";
}

var formContainers = document.getElementsByClassName(
  "newsletter-form-container"
);

for (var i = 0; i < formContainers.length; i++) {
  var formContainer = formContainers[i]
  var handlersAdded = formContainer.classList.contains('newsletter-handlers-added')
  if (handlersAdded) continue;
  formContainer
    .querySelector(".newsletter-form")
    .addEventListener("submit", submitHandler);
  formContainer
    .querySelector(".newsletter-back-button")
    .addEventListener("click", resetFormHandler);
  formContainer.classList.add("newsletter-handlers-added");
}
`;

export default function CommandCenter() {
  const [focused, setFocused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.textContent = FORM_SCRIPT;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#121212] py-28 md:py-40">
      {/* faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 md:px-10">
        <div className="mb-10 text-center">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#00F5FF]"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            // Command Center
          </span>
          <h2
            className="mt-4 font-display font-bold uppercase leading-[0.95] text-[#F9F9F9]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "-0.04em" }}
          >
            Request <span className="text-[#CCFF00]">Access.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-[1.6] text-[#A0A0A0]">
            Join the early access cohort. Be first in line when the protocol goes live.
          </p>
        </div>

        {/* Bio-Data frame */}
        <div
          className="relative rounded-xl border bg-[#0a0a0a]/80 p-6 backdrop-blur-sm md:p-10"
          style={{
            borderColor: focused ? "rgba(204,255,0,0.5)" : "#1f1f1f",
            boxShadow: focused
              ? "0 0 0 1px rgba(204,255,0,0.2), 0 0 60px -10px rgba(204,255,0,0.35), inset 0 0 40px -20px rgba(204,255,0,0.4)"
              : "none",
            transition: "border-color 0.3s ease, box-shadow 0.4s ease",
          }}
          data-cursor="active"
        >
          {/* corner micro-labels */}
          <div className="pointer-events-none absolute -top-px left-4 -translate-y-1/2 bg-[#121212] px-2">
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#5a5a5a]"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              SYSTEM_STATUS: READY
            </span>
          </div>
          <div className="pointer-events-none absolute -top-px right-4 -translate-y-1/2 bg-[#121212] px-2">
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#00F5FF]"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              {focused ? "● ACTIVE" : "○ STANDBY"}
            </span>
          </div>
          <div className="pointer-events-none absolute -bottom-px left-4 translate-y-1/2 bg-[#121212] px-2">
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#5a5a5a]"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              PROTOCOL_ID: P-01
            </span>
          </div>
          <div className="pointer-events-none absolute -bottom-px right-4 translate-y-1/2 bg-[#121212] px-2">
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#5a5a5a]"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              ENCRYPTION: AES-256
            </span>
          </div>

          {/* HTML EMBED BLOCK — custom Loops.so email form injected verbatim */}
          <div
            ref={containerRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="html-embed-block flex justify-center"
            dangerouslySetInnerHTML={{ __html: FORM_HTML }}
          />

          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-[#5a5a5a]" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
            No spam · Unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
}