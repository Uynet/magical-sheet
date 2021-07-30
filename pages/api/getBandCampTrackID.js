// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  //const url = req.query.TrackURL;
  const url = "https://plustek.bandcamp.com/album/skeleton-boomerang-ost";
  fetch(url).then((response) => {
    response.text().then((text) => {
      const trackID = text.split("<!-- album id ")[1].split(" -->\n")[0];
      res.status(200).json({ trackID: trackID });
    });
  });
}
