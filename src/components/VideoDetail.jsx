import { Box, Stack, Typography } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { Loader, Videos } from '.';
import { CheckCircle } from '@mui/icons-material';
// import Loader from './Loader';

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
    });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => {
      setVideo(data.items);
    });
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle, publishedAt, description },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh" px={2}>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={'1 1 100%'}>
          <Box sx={{ width: '100%' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: '#fff' }}
              py={1}
              px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant="h6" color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="subtitle2" color="gray" textAlign={'right'} p={2}>
              {publishedAt.slice(0, 10)}
            </Typography>
            <Typography variant="subtitle1" color="gray" p={2} sx={{ color: 'white' }}>
              {description}
            </Typography>
          </Box>
        </Box>
        <Box
          maxHeight={'95vh'}
          overflow="auto"
          pl={{ md: 2, xs: 0 }}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center">
          <Videos videos={video} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
