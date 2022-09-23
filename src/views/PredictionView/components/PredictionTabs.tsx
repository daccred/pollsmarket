import { EventSummaryCard } from '@/components/cards';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Flex, HStack } from '@chakra-ui/react';
import React from 'react';

// type Props = {}

export function PredictionTabs() {
  const tabs = ['Active Prediction', 'Previous Prediction'];

  return (
    <Tabs variant={'with-line'}>
      <TabList gap={4}>
        <HStack width="full" justifyContent={'center'}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              p={2}
              fontSize={{ base: 'md', md: 'lg' }}
              w={'max-content'}
              _selected={{
                color: 'emphasized',
                borderBottom: '3px solid',
              }}
            >
              {tab}
            </Tab>
          ))}
        </HStack>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex gap={8} wrap="wrap" justifyContent={'center'}>
            {Array(3)
              .fill(1)
              .map((event, index) => (
                <EventSummaryCard key={index} {...({} as any)} />
              ))}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex gap={8} wrap="wrap" justifyContent={'center'}>
            {Array(10)
              .fill(1)
              .map((event, index) => (
                <EventSummaryCard key={index} {...({} as any)} />
              ))}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
