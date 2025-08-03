export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { code } = req.body;
    const clientId = process.env.ANILIST_CLIENT_ID || '29049'; // Your client ID
    const clientSecret = process.env.ANILIST_CLIENT_SECRET || '95OkrXqDFrCYISHz6ltOnuCpEtuF0ji524bIs2Q8'; // Your client secret
    const redirectUri = process.env.ANILIST_REDIRECT_URI || 'https://fluffy-animehub.vercel.app/';

    try {
        const response = await fetch('https://anilist.co/api/v2/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code: code,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        console.error('Token exchange error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
