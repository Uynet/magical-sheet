// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const url = req.query.TrackURL;
  fetch(url).then((response) => {
    response.text().then((text) => {
      //const trackCode = text.split("<!-- album id ")[1].split(" -->\n")[0];
      const trackCode = text
        .split('<meta property="twitter:player" content="')[1]
        .split('<meta property="twitter:player:height"')[0]
        .split('">')[0];
      console.log(trackCode);
      res.status(200).json({ trackCode: trackCode });
    });
  });
}
