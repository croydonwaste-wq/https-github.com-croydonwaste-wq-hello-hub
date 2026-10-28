import { Seo } from "@/components/Seo";
import { ContentBlocks, PageHero } from "@/components/blocks";
import { business } from "@/data/business";
import { GTM_ID } from "@/lib/tracking";

// Template legal copy. BUSINESS CONFIRMATION REQUIRED: have these reviewed and add
// the legal entity, registered address and ICO registration (if applicable).
const LAST_UPDATED = "28 October 2026";

export function Privacy() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Privacy policy", path: "/privacy-policy/" }];
  const controller = business.legalName ?? business.name;
  return (
    <>
      <Seo title="Privacy Policy | Watford Rubbish Clearance" description="How Watford Rubbish Clearance collects, uses and protects personal information submitted through this website." path="/privacy-policy/" />
      <PageHero crumbs={crumbs} h1="Privacy Policy" lead={`Last updated ${LAST_UPDATED}.`} quote={false} />
      <div className="container max-w-3xl py-14">
        <ContentBlocks
          blocks={[
            { h2: "Who we are", paras: [`${controller} ("we") is the data controller for personal information collected through ${business.domain.replace("https://", "")}. Contact us at ${business.email}.`] },
            {
              h2: "What we collect",
              paras: [
                "When you request a quote we collect your name, phone number, email address, postcode, the service you need, who the job is for, a description of the job, access details and any preferred date. If you send photos, we receive those too.",
                "Your request also tells us which page you sent it from and how you found the website (for example a Google search, an advert or a link, including any campaign tags in the web address). We use this only to understand which pages and advertising bring enquiries. It is not stored on your device.",
              ],
            },
            {
              h2: "How we use it",
              list: [
                "To respond to your enquiry and prepare a quote (legitimate interests / steps prior to a contract)",
                "To arrange and carry out the job you book (contract)",
                "To keep records we are legally required to keep, such as waste transfer documentation (legal obligation)",
              ],
              paras: ["We do not sell your information or use it for marketing without your separate consent."],
            },
            { h2: "Who we share it with", paras: ["Only with service providers that help us run the business (for example email and form-handling providers), and authorities where the law requires it."] },
            { h2: "How long we keep it", paras: ["Enquiries that don't lead to a booking are deleted within 12 months. Records relating to completed jobs are kept for as long as required for legal, accounting and waste-regulation purposes."] },
            {
              h2: "Cookies",
              paras: [
                GTM_ID
                  ? "We use Google Analytics (through Google Tag Manager) to measure which pages lead to enquiries, but only if you accept analytics cookies. They are off until you choose, and you can change your choice at any time with the \"Cookie settings\" link at the foot of every page. Your choice itself is remembered on your device."
                  : "This website does not use advertising or analytics cookies. If that changes, we will update this policy and ask for consent first.",
              ],
            },
            {
              h2: "Your rights",
              paras: [
                "You can ask to access, correct or delete your personal information, or object to how we use it, by emailing us. If you're unhappy with how we've handled your data you can complain to the Information Commissioner's Office (ico.org.uk).",
              ],
            },
          ]}
        />
      </div>
    </>
  );
}

export function Terms() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Terms", path: "/terms/" }];
  return (
    <>
      <Seo title="Terms of Service | Watford Rubbish Clearance" description="The terms that apply when you book a rubbish removal or clearance with Watford Rubbish Clearance: quotes, access, items we can't accept and cancellations." path="/terms/" />
      <PageHero crumbs={crumbs} h1="Terms of Service" lead={`Last updated ${LAST_UPDATED}.`} quote={false} />
      <div className="container max-w-3xl py-14">
        <ContentBlocks
          blocks={[
            { h2: "Quotes", paras: ["Quotes are based on the description and photos you provide. If the waste on the day is materially different in volume or type, we'll explain the revised price before loading, and you can choose whether to proceed."] },
            { h2: "Your responsibilities", list: ["Have the legal right to dispose of the items", "Tell us about any hazardous materials", "Make sure we have safe access at the agreed time", "Remove anything you wish to keep from the areas being cleared"] },
            { h2: "Items we can't accept", paras: ["We can't take asbestos, clinical waste, gas bottles, chemicals or other hazardous waste unless agreed in writing in advance."] },
            { h2: "Cancellations", paras: ["Please give us as much notice as possible if you need to cancel or move a booking."] },
            { h2: "Liability", paras: ["We take care with your property. Nothing in these terms limits liability that cannot be limited by law, including your statutory rights as a consumer."] },
          ]}
        />
      </div>
    </>
  );
}
