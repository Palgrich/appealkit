export interface StateDeadline {
  state: string;
  days: string;
  note: string;
  agency: string;
  url: string;
}

/** Verified July 2026 from official state agency pages / statutes. */
export const DEADLINES_VERIFIED = "July 2026";

export const STATE_DEADLINES: StateDeadline[] = [
  { state: "Alabama", days: "15", note: "from mailing date (7 days if hand-delivered)", agency: "Alabama Department of Labor", url: "https://adol.alabama.gov/faq/how-do-i-claimant-or-employer-appeal-an-examiners-determination-on-a-claim-for-benefits/" },
  { state: "Alaska", days: "30", note: "+3 days if determination was mailed", agency: "Alaska Dept. of Labor and Workforce Development", url: "https://labor.alaska.gov/appeals/afiling.htm" },
  { state: "Arizona", days: "15", note: "from mailing date", agency: "Arizona DES", url: "https://des.az.gov/services/employment/unemployment-individual/unemployment-insurance-benefits-appeals" },
  { state: "Arkansas", days: "20", note: "postmarked/faxed within 20 days of mailing", agency: "Arkansas Division of Workforce Services", url: "https://dws.arkansas.gov/workforce-services/appealing-ui-determination/" },
  { state: "California", days: "30", note: "from mailing date; late appeals with good cause", agency: "California EDD", url: "https://edd.ca.gov/en/unemployment/appeals/" },
  { state: "Colorado", days: "20", note: "must be RECEIVED (not just postmarked) by day 20", agency: "Colorado CDLE", url: "https://cdle.colorado.gov/unemployment/appeals/submit-an-appeal" },
  { state: "Connecticut", days: "21", note: "from mailing date", agency: "Connecticut Department of Labor", url: "https://portal.ct.gov/dol/knowledge-base/articles/ui-appeals/how-do-i-appeal-an-unemployment-benefits-decision" },
  { state: "Delaware", days: "10", note: "from determination date", agency: "Delaware Division of Unemployment Insurance", url: "https://labor.delaware.gov/divisions/unemployment-insurance/claimant-faqs/" },
  { state: "District of Columbia", days: "15", note: "from mailing; next business day if weekend/holiday", agency: "DC DOES / Office of Administrative Hearings", url: "https://unemployment.dc.gov/page/information-appeals" },
  { state: "Florida", days: "20", note: "after mailing date of notice", agency: "FloridaCommerce — Reemployment Assistance", url: "https://floridajobs.org/workforce-resources/reemployment-assistance/claimants/file-an-appeal" },
  { state: "Georgia", days: "15", note: "from date on determination", agency: "Georgia Department of Labor", url: "https://dol.georgia.gov/file-appeal" },
  { state: "Hawaii", days: "10", note: "up to 30 only with good cause", agency: "Hawaii DLIR", url: "https://labor.hawaii.gov/esaro/appeals-process/" },
  { state: "Idaho", days: "14", note: "from mailing date", agency: "Idaho Department of Labor", url: "https://www.labor.idaho.gov/unemployment-benefits/how-to-file-an-appeal/" },
  { state: "Illinois", days: "30", note: "from mailing date", agency: "Illinois IDES", url: "https://ides.illinois.gov/unemployment/appeals.html" },
  { state: "Indiana", days: "15", note: "from 'sent' date on determination", agency: "Indiana DWD", url: "https://www.in.gov/dwd/indiana-unemployment/individuals/file-an-appeal" },
  { state: "Iowa", days: "10", note: "postmarked or received; next working day if weekend", agency: "Iowa Workforce Development", url: "https://workforce.iowa.gov/unemployment/appeals" },
  { state: "Kansas", days: "16", note: "from mailing date", agency: "Kansas Department of Labor", url: "https://www.dol.ks.gov/unemployment/appeals" },
  { state: "Kentucky", days: "30", note: "from mail date", agency: "Kentucky Office of Unemployment Insurance", url: "https://kcc.ky.gov/career/Pages/UI-FAQ-Guide.aspx" },
  { state: "Louisiana", days: "15", note: "from mailing date", agency: "Louisiana Workforce Commission", url: "https://www2.laworks.net/FAQs/FAQ_UI_ClaimantAppeals.asp" },
  { state: "Maine", days: "30", note: "recent law change — older sources say 15", agency: "Maine Bureau of Unemployment Compensation", url: "https://www.maine.gov/unemployment/appeals/" },
  { state: "Maryland", days: "15", note: "from mailing; extendable for good cause", agency: "Maryland Division of Unemployment Insurance", url: "https://labor.maryland.gov/uiappeals/apfile.shtml" },
  { state: "Massachusetts", days: "10", note: "from mailing date", agency: "Massachusetts DUA", url: "https://www.mass.gov/how-to/appeal-an-unemployment-determination" },
  { state: "Michigan", days: "30", note: "first step is a 'protest' of the determination", agency: "Michigan UIA", url: "https://www.michigan.gov/leo/bureaus-agencies/uia/tools/publications/protest-and-appeal-process" },
  { state: "Minnesota", days: "45", note: "recent law change — older sources say 20", agency: "Minnesota DEED", url: "https://mn.gov/uimn/applicants/howappeal/" },
  { state: "Mississippi", days: "14", note: "from mailing date", agency: "Mississippi MDES", url: "https://www.mdes.ms.gov/unemployment-claims/benefit-information/appeals/appeals-process/" },
  { state: "Missouri", days: "30", note: "from determination date", agency: "Missouri Division of Employment Security", url: "https://labor.mo.gov/des/appeals/how-to-file-appeal" },
  { state: "Montana", days: "10", note: "extendable for good cause", agency: "Montana DLI Unemployment Insurance Division", url: "https://uid.dli.mt.gov/claimants/appeals-faq" },
  { state: "Nebraska", days: "20", note: "from mailing date", agency: "Nebraska Department of Labor", url: "https://dol.nebraska.gov/UIBenefits/Claims/FAQ/DisqualificationsAndAppealRights" },
  { state: "Nevada", days: "11", note: "from mailing date", agency: "Nevada DETR", url: "https://detr.nv.gov/Page/NUI_Appeals_Information" },
  { state: "New Hampshire", days: "14", note: "extensions possible for good cause", agency: "New Hampshire Employment Security", url: "https://www.nhes.nh.gov/individuals/unemployment-appeals" },
  { state: "New Jersey", days: "21", note: "extended by 2022 law — older sources say 7-10", agency: "New Jersey Division of Unemployment Insurance", url: "https://myunemployment.nj.gov/appeals/claimant/" },
  { state: "New Mexico", days: "15", note: "from transmission of determination", agency: "New Mexico DWS", url: "https://www.dws.state.nm.us/Unemployment/Appeal-Hearing-Information" },
  { state: "New York", days: "30", note: "postmarked within 30 days of determination date", agency: "New York State DOL / UI Appeal Board", url: "https://uiappeals.ny.gov/request-hearing" },
  { state: "North Carolina", days: "30", note: "10-day window for monetary determinations", agency: "North Carolina DES", url: "https://www.des.nc.gov/appeals/file-appeal" },
  { state: "North Dakota", days: "12", note: "after mailing of determination", agency: "Job Service North Dakota", url: "https://www.jobsnd.com/what-if-i-disagree-job-service-decision" },
  { state: "Ohio", days: "21", note: "from date determination was sent", agency: "Ohio ODJFS", url: "https://jfs.ohio.gov/unemployment-services/for-workers/manage-a-claim/appeal-my-claim" },
  { state: "Oklahoma", days: "10", note: "next business day if deadline falls on weekend", agency: "Oklahoma OESC", url: "https://oklahoma.gov/oesc/appeals.html" },
  { state: "Oregon", days: "20", note: "decision becomes final after 20 days", agency: "Oregon Employment Department", url: "https://unemployment.oregon.gov/appeals" },
  { state: "Pennsylvania", days: "21", note: "next business day if deadline falls on weekend", agency: "Pennsylvania Office of UC Benefits", url: "https://www.pa.gov/agencies/dli/programs-services/unemployment/appeals/appealing-a-determination-to-a-uc-referee" },
  { state: "Rhode Island", days: "15", note: "calendar days incl. weekends", agency: "Rhode Island DLT", url: "https://dlt.ri.gov/individuals/unemployment-insurance/appeal-process/appeal-decision" },
  { state: "South Carolina", days: "10", note: "from mailing date", agency: "South Carolina DEW", url: "https://dew.sc.gov/individuals/appeals" },
  { state: "South Dakota", days: "15", note: "from mailing date", agency: "South Dakota DLR", url: "https://dlr.sd.gov/ra/individuals/appeals.aspx" },
  { state: "Tennessee", days: "15", note: "from mailing date", agency: "Tennessee Dept. of Labor and Workforce Development", url: "https://www.tn.gov/workforce/unemployment/appeal-an-agency-decision.html" },
  { state: "Texas", days: "14", note: "from date TWC mails determination", agency: "Texas Workforce Commission", url: "https://www.twc.texas.gov/services/file-unemployment-appeal" },
  { state: "Utah", days: "15", note: "from date on decision", agency: "Utah DWS", url: "https://jobs.utah.gov/appeals/filing.html" },
  { state: "Vermont", days: "30", note: "unless otherwise noted on determination", agency: "Vermont Department of Labor", url: "https://labor.vermont.gov/unemployment-insurance/ui-claimants/claimant-appeal-information" },
  { state: "Virginia", days: "30", note: "extendable for good cause", agency: "Virginia Employment Commission", url: "https://www.vec.virginia.gov/FAQs/appeals-process/when-must-i-file-appeal-and-can-i-extend-appeal-period" },
  { state: "Washington", days: "30", note: "from date ESD sends decision", agency: "Washington ESD", url: "https://esd.wa.gov/get-financial-help/unemployment-benefits/appeal-unemployment-benefits-decision" },
  { state: "West Virginia", days: "8", note: "one of the shortest in the US", agency: "WorkForce West Virginia", url: "https://workforcewv.org/unemployment-insurance-benefits/my-unemployment-claim/disqualification-appeals/" },
  { state: "Wisconsin", days: "14", note: "deadline is printed on your determination", agency: "Wisconsin DWD", url: "https://dwd.wisconsin.gov/uiben/appeals-and-petitions.htm" },
  { state: "Wyoming", days: "28", note: "from date notice was mailed", agency: "Wyoming DWS", url: "https://dws.wyo.gov/dws-division/unemployment-insurance/appeals/" },
];
