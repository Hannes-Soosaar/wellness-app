import React from "react";
import ReactMarkdown from "../components/MarkdownRenderer";

const TCMarkdown: string = ` 
# Terms and Conditions

**Last Updated:** 18.08.2025

Welcome to Wellness-App (“we”, “our”, “us”). By accessing or using our website (wellness-agent.eu), you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please do not use our website.

---

## 1. Use of the Website
- You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others or restrict anyone else’s use of the website.  
- We reserve the right to restrict or terminate access to our website at any time without notice.  

---

## 2. Account and Security
- If you create an account on our website, you are responsible for maintaining the confidentiality of your account credentials.  
- You are responsible for all activity that occurs under your account.  

---

## 3. Cookies
- Our website uses cookies solely for authentication purposes.  
- The only cookie we set is a **refresh token** cookie, which allows you to stay logged in securely.  
- We do **not** use third-party tracking cookies.  
- By using our website, you consent to the use of this cookie as described.  
- You can manage or delete cookies through your browser settings; however, doing so may affect your ability to remain logged in.  

---

## 4. OAuth Login
- If you log in using a third-party service such as Google, Facebook, or GitHub, your use of that service is subject to the third-party’s Terms of Service and Privacy Policy.  
- By using OAuth login, you consent to sharing your basic profile information (e.g., email, name) from the third-party service with our website.  

---

## 5. Third-Party Services
- Our website uses **Scaleway** for hosting and **AI services** to provide certain features.  
- By using our website, you acknowledge that these services may process data on our behalf and are subject to their own Terms and Privacy Policies.  
- We recommend reviewing the terms of any third-party service you interact with:  
  - [Scaleway Terms](https://www.scaleway.com/en/legal/terms/)  
  - LLAMA 3.3  https://www.llama.com/llama3_3/license/ 

---

## 6. Intellectual Property
- All content, designs, logos, and graphics on this website are owned by [Your Website Name] unless otherwise stated.  
- You may not copy, reproduce, or distribute any content from this website without prior written permission.  

---

## 7. Disclaimer
- The website is provided “as is” without warranties of any kind, either express or implied.  
- We do not guarantee that the website will always be available, error-free, or secure.  

---

## 8. Limitation of Liability
- We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website.  
- Your use of the website is at your own risk.  

---

## 9. Changes to Terms
- We may update these Terms and Conditions from time to time.  
- Changes will be posted on this page with the “Last Updated” date. Your continued use of the website constitutes acceptance of the updated terms.  

---

## 10. Contact Us
If you have any questions about these Terms and Conditions, please contact us at:  
**hannes@wellness-agent.eu**
`;

const Terms: React.FC = () => {
  return (
    <>
      <div className="privacy-policy">
        <ReactMarkdown content={TCMarkdown} />
      </div>
    </>
  );
};

export default Terms;
