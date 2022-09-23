import { EventSummaryCard, EventFeatureCard } from '@/components/cards';
import { Wrapper, WrapperEnum } from '@/components/partials';
import { Flex, Heading, Stack, useBreakpointValue } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';

import React from 'react';

const HomePage = () => {
  const views = useBreakpointValue({ base: 1.2, sm: 2, md: 2.5, lg: 3.2 });
  return (
    <Wrapper context={WrapperEnum.INNER}>
      <Stack spacing={12}>
        <Stack>
          <Heading size="sm">Popular Events</Heading>
          <Swiper
            slidesPerView={views}
            spaceBetween={20}
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {/* <Flex alignItems="center" overflowX={'hidden'} gap={6}> */}
            {Array(10)
              .fill(0)
              .map((event, index) => (
                <SwiperSlide key={index}>
                  <EventFeatureCard />
                </SwiperSlide>
              ))}
            {/* </Flex> */}
          </Swiper>
        </Stack>
        <Stack>
          <Heading textAlign={'center'} size="sm">
            All Events
          </Heading>
          <Flex alignItems="center" justifyContent={'center'} wrap="wrap" gap={6}>
            {Array(10)
              .fill(0)
              .map((event, index) => (
                <EventSummaryCard key={index} {...({} as any)} />
              ))}
          </Flex>
        </Stack>
      </Stack>
    </Wrapper>
  );
};
export default HomePage;
