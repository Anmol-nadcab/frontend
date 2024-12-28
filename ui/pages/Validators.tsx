import { Box, Hide, HStack, Show } from '@chakra-ui/react'; // Correct import
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import useIsMobile from 'lib/hooks/useIsMobile';
import ActionBar from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';

import ValidatorsCounters from 'ui/validators/ValidatorsCounters';
import { callApi } from 'customApi/api';

interface Validator {
  _id: string;
  address: string;
  __v: number;
  count: number;
  createdAt: string;
  lastCheckedBlock: number;
  reward: number;
  updatedAt: string;
}

interface ValidatorResponse {
  success: boolean;
  totalValidators: number;
  totalPages: number;
  currentPage: number;
  data: Validator[];
  message: string;
}

const Validators = () => {
  
 
  // const router = useRouter();
  const [ validatorsData, setValidatorsData ] = useState([]); // Placeholder, fix with types if needed
  const [ totalPages, setTotalPages ] = useState(1);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ sort, setSort ] = useState<string | undefined>(undefined);


  useEffect(() => {
    callApi()?.then((res)=>{
      console.log(res,5656);
    }).catch((err)=>{
      console?.log(err,5656);
    })

  }, []);

  // const handleStateFilterChange = (value: string | Array<string>) => {
  //   if (Array.isArray(value)) return;
  //   const state = value === 'all' ? undefined : value;
  //   setStatusFilter(state);
  // };

  const handleSortChange = (value?: string) => {
    setSort(value);
  };

  // const filterMenu = (
  //   <ValidatorsFilter onChange={handleStateFilterChange} defaultValue={statusFilter} hasActiveFilter={Boolean(statusFilter)} />
  // );

  // const sortButton = (
  //   <Sort name="validators_sorting" defaultValue={sort} options={SORT_OPTIONS} onChange={handleSortChange} />
  // );

  const actionBar = (
    <>
      <HStack spacing={3} mb={6} display={{ base: 'flex', lg: 'none' }}>
        {/* {filterMenu}
        {sortButton} */}
      </HStack>
      <ActionBar mt={-6}>
        <HStack spacing={3} display={{ base: 'none', lg: 'flex' }}>
          {/* {filterMenu} */}
        </HStack>
        {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}
      </ActionBar>
    </>
  );

  const content = validatorsData.length > 0 ? (
    <>
      <Show below="lg" ssr={false}>
        {/* <ValidatorsList data={validatorsData} /> */}
      </Show>
      <Hide below="lg" ssr={false}>
        {/* <ValidatorsTable data={validatorsData} sort={sort} setSorting={handleSortChange} /> */}
      </Hide>
    </>
  ) : null;

  return (
    <Box>
      <PageTitle title="Validators" withTextAd />
      <ValidatorsCounters/>
      <DataListDisplay
        isError={!validatorsData.length}
        items={validatorsData}
        emptyText="There are no verified validators."
        // filterProps={{
        //   emptyFilteredText: "Couldn't find any validator that matches your query.",
        //   // hasActiveFilters: Boolean(statusFilter),
        // }}
        content={content}
        actionBar={actionBar}
      />
    </Box>
  );
};

export default Validators;