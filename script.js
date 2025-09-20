// Year in footer
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Bootstrap form validation
(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Simple i18n (English/Hindi)
const i18n = {
  en: {
    nav_home:"Home", nav_about:"About", nav_services:"Services", nav_blog:"Blog/Resources", nav_contact:"Contact",
    cta_consult:"Get Free Consultation Now", cta_call:"Call Now", cta_whatsapp:"Message on WhatsApp",
    hero_headline:"Empowering Your MSME Journey with Expert Guidance",
    hero_sub:"Udyam registration, GST & tax consultation, loans & subsidies, compliance support and project reports—everything your MSME needs in one place.",
    about_heading:"About Ajay Kumar",
    about_para1:"I’m an MSME consultant from Soraon, Prayagraj, Uttar Pradesh, with 5+ years of experience helping entrepreneurs and small businesses get registered, compliant, and funded.",
    about_para2:"My mission is simple: make business setup and growth easy. From Udyam and GST to project reports, loans, and government schemes—I guide you end‑to‑end so you can focus on building your enterprise.",
    services_heading:"Our Services", services_cta:"Ask About a Service",
    svc_udyam:"MSME/Udyam Registration", svc_udyam_desc:"Fast and accurate Udyam registration with documentation help and updates.",
    svc_gst:"GST & Tax Consultation", svc_gst_desc:"GST registration, returns, and compliance guidance tailored for MSMEs.",
    svc_loans:"Business Loan / Grant Assistance", svc_loans_desc:"Support for Mudra/CGTMSE and other bank/NBFC loans, plus subsidies and grants.",
    svc_comp:"Compliance Support", svc_comp_desc:"Licenses, renewals, and regulatory filings so you stay compliant year‑round.",
    svc_report:"Project Report Preparation", svc_report_desc:"Bank‑ready project reports with financials and market insights.",
    svc_schemes:"Government Schemes & Subsidy Guidance", svc_schemes_desc:"Identify and apply for central/state schemes that fit your business.",
    testimonials_heading:"Client Testimonials",
    downloads_heading:"Downloadable Forms",
    blog_heading:"Blog & Resources",
    contact_heading:"Contact",
    contact_form:"Send a Message",
    form_name:"Name", form_email:"Email", form_message:"Message", form_submit:"Send Message"
  },
  hi: {
    nav_home:"होम", nav_about:"हमारे बारे में", nav_services:"सेवाएँ", nav_blog:"ब्लॉग/संसाधन", nav_contact:"संपर्क",
    cta_consult:"अभी फ्री कंसल्टेशन लें", cta_call:"कॉल करें", cta_whatsapp:"व्हाट्सऐप पर संदेश भेजें",
    hero_headline:"विशेषज्ञ मार्गदर्शन के साथ आपकी MSME यात्रा को सशक्त बनाएं",
    hero_sub:"उद्योग (Udyam) पंजीकरण, GST व कर सलाह, लोन व सब्सिडी, कंप्लायंस सपोर्ट और प्रोजेक्ट रिपोर्ट — सब कुछ एक ही जगह।",
    about_heading:"अजय कुमार के बारे में",
    about_para1:"मैं सोरांव, प्रयागराज (उ.प्र.) से MSME कंसल्टेंट हूँ। पिछले 5+ वर्षों से उद्यमियों और छोटे व्यापारों को रजिस्ट्रेशन, कंप्लायंस और फंडिंग में मदद कर रहा हूँ।",
    about_para2:"मेरा उद्देश्य है बिज़नेस सेटअप और ग्रोथ को आसान बनाना। Udyam व GST से लेकर प्रोजेक्ट रिपोर्ट, लोन और सरकारी योजनाओं तक — मैं एंड‑टू‑एंड मार्गदर्शन देता हूँ ताकि आप अपने बिज़नेस पर फोकस कर सकें।",
    services_heading:"हमारी सेवाएँ", services_cta:"सेवा के बारे में पूछें",
    svc_udyam:"MSME/उद्योग पंजीकरण", svc_udyam_desc:"तेज़ और सटीक उद्यम पंजीकरण, दस्तावेज़ सहायता और अपडेट के साथ।",
    svc_gst:"GST व टैक्स परामर्श", svc_gst_desc:"MSME के लिए उपयुक्त GST रजिस्ट्रेशन, रिटर्न और कंप्लायंस गाइडेंस।",
    svc_loans:"बिज़नेस लोन / अनुदान सहायता", svc_loans_desc:"मुद्रा/CGTMSE सहित बैंक/NBFC लोन, सब्सिडी और ग्रांट्स में सहायता।",
    svc_comp:"कम्प्लायंस सपोर्ट", svc_comp_desc:"लाइसेंस, नवीनीकरण और नियामकीय फाइलिंग ताकि आप वर्ष भर कंप्लायंट रहें।",
    svc_report:"प्रोजेक्ट रिपोर्ट तैयारी", svc_report_desc:"बैंक‑रेडी प्रोजेक्ट रिपोर्ट वित्तीय और बाज़ार जानकारी के साथ।",
    svc_schemes:"सरकारी योजनाएँ व सब्सिडी मार्गदर्शन", svc_schemes_desc:"केंद्रीय/राज्य योजनाएँ पहचानें और आवेदन करें जो आपके बिज़नेस के अनुरूप हों।",
    testimonials_heading:"क्लाइंट टेस्टिमोनियल्स",
    downloads_heading:"डाउनलोड्स",
    blog_heading:"ब्लॉग व संसाधन",
    contact_heading:"संपर्क",
    contact_form:"संदेश भेजें",
    form_name:"नाम", form_email:"ईमेल", form_message:"संदेश", form_submit:"भेजें"
  }
};

function applyI18n(lang){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = i18n[lang][key];
    if (txt) el.textContent = txt;
  });
  document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  localStorage.setItem('ajay_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('ajay_lang') || 'en';
  applyI18n(saved);
  const btn = document.getElementById('toggle-lang');
  if (btn){
    btn.addEventListener('click', () => {
      const now = document.documentElement.lang === 'hi' ? 'en' : 'hi';
      applyI18n(now);
    });
  }
});

