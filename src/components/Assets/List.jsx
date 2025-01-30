'use client'
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback, useRef } from "react";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import SortModal from "@/components/Elements/SortModal/SortModal";
import FilterModal from "@/components/Elements/FilterModal/FilterModal";
import Button, { TextButton } from "../Elements/Button/Button";
import S3Image from "../Elements/S3Image/S3Image";
import AddAsset from "./AddAsset";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./List.css";
import EditAsset from "./EditAsset";
import useApi from "@/hooks/useApi";
import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";
import { Checkbox } from "primereact/checkbox";
import AssetsDataTableComponent from "@/components/Elements/DataTable/Assets";

export default function List({ assets, fetchListAssets }) {
  const { push } = useRouter()
  const { fetchData } = useApi()
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(assets);

  const [filters, setFilters] = useState({
    status: "",
    activity: "",
    totalAssets: "",
    totalUsers: ""
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeRowData, setActiveRowData] = useState({});
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleUpdateAsset = async (payload, assetId) => {
    const { result, error } = await fetchData(
      `/asset/${assetId}`,
      {
        method: "PUT",
        body: payload
      }
    );
    if (result) {
      fetchListAssets();
    } else {
      // Error Message
      console.log(error)
    }
  }

  useEffect(() => {
    setData(assets);
  }, [assets]);

  const handleOption = (option, data) => {
    switch (option) {
      case "Edit Details":
        openEditModal();
        data && setActiveRowData(data);
        break;
      case "Suspend":
        console.log(data)
        handleUpdateAsset({
          status: !data?.status
        }, data.asset_id)
        break;
      case "Activate":
        handleUpdateAsset({
          status: true,
          active: true
        }, data.asset_id)
        break;
      case "Reject":
        handleUpdateAsset({
          status: true,
          active: false
        }, data.asset_id)
        break;
    }
  };

  const handleSearch = (searchTerm) => {
    // const filtered = assets.filter(asset =>
    //   asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // setFilteredData(filtered);
  };

  const filterData = useCallback(() => {
    const filteredData = assets?.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === "") return true; // Skip empty filters

        switch (key) {
          case 'status':
            return item.status === (value.toLowerCase() === 'active');
          case 'activity':
            const daysSinceUpdate = (new Date() - new Date(item?.updated_at)) / (1000 * 60 * 60 * 24);
            switch (value.toLowerCase()) {
              case 'daily':
                return daysSinceUpdate <= 1;
              case 'weekly':
                return daysSinceUpdate <= 7;
              case 'monthly':
                return daysSinceUpdate <= 30;
              default:
                return true;
            }
          case 'totalAssets':
            // Assuming totalAssets is a string like "$10-50K"
            const [min, max] = value.replace('$', '').split('-').map(v => parseInt(v.replace('K', '000')));
            const companyAssets = parseInt(item?.totalAssets?.replace('$', '').replace('K', '000'));
            return companyAssets >= min && companyAssets <= max;
          case 'totalUsers':
            return value === "" || item?.totalUsers?.toString() === value;
          default:
            return item[key] && item[key].toString().toLowerCase().includes(value.toLowerCase());
        }
      });
    });

    setData(filteredData);
  }, [assets, filters]);

  const sortData = (array, sortKey, sortOrder) => {
    if (!Array.isArray(array)) {
      return array; // Return the input as-is if it's not an array
    }

    return array.slice().sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSortChange = (sort) => {
    const { sort: sortKey, order: sortOrder } = sort;
    setData(sortData(data, sortKey, sortOrder));
  };

  const handleFilterChange = (filter) => {
    setFilters(prevFilters => ({ ...prevFilters, ...filter }));
  };

  useEffect(() => {
    filterData();
  }, [filterData]);

  return (
    <>
      <AssetsDataTableComponent
        data={data}
        title={'Assets'}
        btnText="Add new asset"
        handleClick={openModal}
        filteredData={filterData}
        handleSearch={handleSearch}
        handleOption={handleOption}
        handleRowClick={(id) => push(`/dashboard/assets/${id}`)}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
      />
      <AddAsset
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        fetchListAssets={fetchListAssets}
      />

      <EditAsset
        isModalOpen={isEditModalOpen}
        closeModal={closeEditModal}
        fetchListAssets={fetchListAssets}
        initialData={{
          asset_id: activeRowData.asset_id,
          name: activeRowData.name,
          ticker: activeRowData.ticker,
          usd_value: parseInt(activeRowData.usd_value),
          daily_volume: parseInt(activeRowData.daily_volume),
          type: activeRowData.type,
          status: activeRowData.status,
          liquidity: activeRowData?.liquidity?.map(each => {
            return {
              value: each.vendor_id,
              label: each.name
            }
          }),
          country: activeRowData.country,
          icon: activeRowData.icon
        }}
      />
    </>
  );
}
