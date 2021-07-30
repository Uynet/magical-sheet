// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const url = req.query.TrackURL;
  fetch(url).then((response) => {
    response.text().then((text) => {
      const trackID = text
        .split('content="soundcloud://sounds:')[1]
        .split('"><meta')[0];
      res.status(200).json({ trackID: trackID });
    });
  });
}

/*
export default function handler(req, res) {
  fetch("https://soundcloud.com/uynet/45jqy2ydqyih").then((response) => {
    res.status(200).json(response.body);
  });
}
*/
