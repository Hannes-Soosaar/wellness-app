import React from "react";
import ReactMarkdown from "../components/MarkdownRenderer";

const PrivacyMarkdown: string = `# Privacy Policy

**Last Updated:** 09.05.2025

---

## 1. Introduction
Welcome to Wellness-App. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when you use our website and services. We are committed to ensuring that your information is secure and handled in compliance with the General Data Protection Regulation (GDPR).

---

## 2. Data Controller and Contact Information
The data controller responsible for your personal data is:

- **Company Name:** Wellness App  
- **Address:** Jõhvi  
- **Email:** hannes@wellness-agent.eu  
- **Phone:** +37256988565  

If you have any questions or requests concerning your data, please contact us using the details above.

---

## 3. Data We Collect
We collect and process the following types of personal data:

- **Personal Identification Information:** Name, email address, username, and password.  
- **Usage Data:** IP address, browser type, operating system, and interaction data.  
- **Third-Party Authentication Data:** Profile information (e.g., name, email) from Google and Discord if you register through these services.  

---

## 4. How We Collect Your Data
We collect data in the following ways:

- **Directly from you:** When you register or interact with our services.  
- **Automatically:** Through cookies and similar technologies when you visit our website.  
- **Third-Party Services:** When you register or log in via Google or Discord.  

---

## 5. Purpose and Legal Basis for Processing
We process your data for the following purposes:

- **To provide our services:** To manage your account and facilitate login.  
- **To communicate with you:** For notifications, updates, or support.  
- **To improve our services:** By analyzing usage data.  

**Legal basis:** We process your data based on your consent (Article 6(1)(a) GDPR) and for the performance of a contract (Article 6(1)(b) GDPR).

---

## 6. Sharing Your Data
We may share your data with third parties in the following scenarios:

- **Third-Party Service Providers:** We use external servers and databases hosted by NONE, which comply with GDPR. You can view their privacy policy here: 
- **Legal Obligations:** If required to comply with legal regulations.  

---

## 7. How We Store Your Data
Your data is securely stored on servers located in EU servers only. We ensure appropriate security measures to protect your data, including encryption and access control.

We retain your personal data only as long as necessary to fulfill the purposes for which it was collected, or as required by law.

---

## 8. Your Data Protection Rights
You have the following rights under GDPR:

- **Right to Access:** Request a copy of your personal data.  
- **Right to Rectification:** Request correction of inaccurate data.  
- **Right to Erasure:** Request deletion of your data.  
- **Right to Restrict Processing:** Limit how we use your data.  
- **Right to Data Portability:** Obtain a copy of your data in a structured, machine-readable format.  
- **Right to Object:** Object to data processing in certain circumstances.  

To exercise your rights, please contact us at **hannes@wellness-agent.eu**.

---

## 9. Cookies and Tracking
We use cookies to enhance your experience and analyze usage data. You can manage your cookie preferences through your browser settings.

For more details, read our Cookie Policy.

---

## 10. Changes to This Policy
We may update this Privacy Policy from time to time. The most recent version will always be available on our website. Please check back periodically for updates.

---

## 11. Contact Us
If you have any questions about this Privacy Policy or your data, please contact us at: **hannes@wellness-agent.eu**
`;
const Privacy: React.FC = () => {
  return (
    <>
      <div className="privacy-policy">
        <ReactMarkdown content={PrivacyMarkdown} />
      </div>
    </>
  );
};

export default Privacy;
