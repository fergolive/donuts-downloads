import ytdl from 'ytdl-core';

export const welcome = async (req, res) => {
  res.json('Server Ready')
}

export const videoInfo = async (req, res) => {

  try {
    let video=req.body

    let video_url=video.url

    let info = await ytdl.getInfo(video_url);

    let video_info={
      url:video_url,
      title:info.videoDetails.title,
      size:info.size,
      time:info.videoDetails.lengthSeconds,
      available_audios:[],
      available_videos_qualities:[]
    }


    let audios=[]
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    audioFormats.forEach(format => {
      video_info.available_audios.push(`${format.audioQuality} - ${format.container}`);
    });


    const videoFormats = ytdl.filterFormats(info.formats, 'videoandaudio');
    videoFormats.forEach(format => {
      video_info.available_videos_qualities.push(`${format.qualityLabel} - ${format.container}`);
    });

    res.json(video_info)
   

  } catch (error) {
    return res.status(500).json(error);
  }
};



export const downloadVideo = async (req, res) => {

  try {
    var url = req.query.url;
    if (!ytdl.validateURL(url)) {
        return res.status(400).send('URL inválida');
    }

    let info = await ytdl.getInfo(url);
    let format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(url, { format: format }).pipe(res);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
  }
};

export const downloadAudio = async (req, res) => {

  try {
      var url = req.query.url;
      if (!ytdl.validateURL(url)) {
          return res.status(400).send('URL inválida');
      }

      let info = await ytdl.getInfo(url);
      let format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

      res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
      ytdl(url, { format: format }).pipe(res);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
  }

};



