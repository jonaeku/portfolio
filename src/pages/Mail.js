import sgMail from "@sendgrid/mail";
sgMail.setApiKey(import.meta.env.PUBLIC_SENDGRID_API);
 
export async function post({ request }) {
  const data = await request.json()
  await sgMail.send({
    to: "hello@ionae.de",
    from: "Anfrage@ionae.de",
    templateId: "d-613fda644ea44d9eb7b1b28b8fdd1f4a",
    dynamicTemplateData: {
      subject: `Anfrage von ${data.email}`,
      name: "Jona",
      nameRequest: data.name,
      email: data.email,
      text: data.message,
    },
  });
  return new Response(JSON.stringify({ successful: true }), { status: 200 });
};
