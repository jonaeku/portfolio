import axios from "axios";

export async function post({ request }) {
  const data = await request.json();
  try {
    const response = await axios({
      method: "post",
      url: "https://api.sendinblue.com/v3/smtp/email",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.PUBLIC_MAIL_API,
      },
      data: {
        sender: { name: data.name, email: data.email },
        to: [{ email: "jona@ionae.de" }],
        subject: "Anfrage Webdesign von " + data.name,
        htmlContent: `
          <div style="display: flex; justify-content: center; align-items: center;">
            <div style="background-color: #f2f2f2; width: 50%; border-radius: 5px;">
              <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 50px; background-color: #3788aa;">
                <h2 style="text-align: center; color: white;">Anfrage Webdesign</h2><br/>
              </div>
              <div style="margin: 0px 20px">
                <p style="font-size: 18px;">Name: ${data.name}</p>
                <p style="font-size: 18px;">E-Mail: ${data.email}</p><br/>
                <p style="font-size: 18px;">Nachricht von ${data.name}:</p>
                <p style="font-size: 18px;">${data.message}</p>
              </div>  
              <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 50px; background-color: #3788aa;">
                <a href="https://ionae.de" style="font-size: 12px; color: white;">ionae.de</a>
              </div>
            </div>
          </div>
        `,
      },
    });

    // Überprüfung, ob 'body'-Wert vorhanden ist
    if (response && response.body) {
      return {
        type: "simple",
        body: response.body,
        encoding: response.encoding,
      };
    } else {
      return {
        type: "text",
        body: "Die Antwort der API ist ungültig.",
        encoding: "utf8",
      };
    }
  } catch (error) {
    // Fehlerbehandlung hier
    console.log(error);
    return {
      type: "text",
      body: "Ein Fehler ist aufgetreten.",
      encoding: "utf8",
    };
  }
}