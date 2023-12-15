import { Box, Stack } from '@mui/material';
import { VideoCard, ChannelCard, Loader } from './';

const Videos = ({ videos }) => {
  if (!videos?.length) return <Loader />;

  return (
    <Stack
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={2}
      width="100%">
      {videos.map(
        (item, idx) =>
          (item.id.videoId || item.id.channelId) && (
            <Box key={idx}>
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
          ),
      )}
    </Stack>
  );
};

export default Videos;
