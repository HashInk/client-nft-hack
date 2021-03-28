//@ts-ignore
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: 'f0e3b9e5a4a9f1cd42e096cdb05247b7-us1',
  server: 'us1',
});

export default async (req: any, res: any) => {
  const { emailAddress } = req.body;

  try {
    await mailchimp.lists.addListMember('ba6c013bf9', {
      email_address: emailAddress,
      status: 'subscribed',
    });

    return res.status(201).json({ error: '' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
