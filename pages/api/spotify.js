const getAccessToken = async () => {
  const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
    })
  });

  return response.json();
};

const getCurrentlyPlaying = async () => {
  const { access_token } = await getAccessToken();
  return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
}

export default async function handler(req, res) {
  const response = await getCurrentlyPlaying();
  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }
  const song = await response.json();
  if (song.item === null) {
    return res.status(200).json({ isPlaying: false });
  }
  const isPlaying = song.is_playing;
  if (isPlaying) {
    const title = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;
    return res.status(200).json({ isPlaying, artist, title, album, albumImageUrl, songUrl });
  }
  return res.status(200).json({ isPlaying: false });
}
