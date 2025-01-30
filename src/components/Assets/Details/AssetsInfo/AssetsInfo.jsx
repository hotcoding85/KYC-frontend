import React, { useEffect, useState } from "react"

import useApi from "@/hooks/useApi"
import AssetsInfoNodes from "./Nodes"
import AssetsInfoNetworks from "./Networks"
import AssetsInfoPolicies from "./Policies"
import AssetsInfoOverview from "./Overview"
import { useParams } from "next/navigation"
import AssetsProtocols from "@/components/Assets/Details/AssetsInfo/Protocols"
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation"

export default function AssetsInfo({ assetData, toast }) {
  const params = useParams()
  const asset_id = params.id

  const { fetchData } = useApi()

  const [nodes, setNodes] = useState([])
  const [networks, setNetworks] = useState([])
  const [activeTab, setActiveTab] = useState(0)

  const handleFetchNodes = async () => {
    if (asset_id) {
      const { result, error } = await fetchData(`/node/asset/${asset_id}`)
      if (result) {
        console.log(result)
        const nodeValues = result.map(each => {
          return {
            value: each.node_id,
            label: each.name
          }
        })
        setNodes(nodeValues)
      } else {
        console.log(error)
      }
    }
  }

  const handleFetchNetworks = async () => {
    if (asset_id) {
      const { result, error } = await fetchData(`/networks/asset/${asset_id}`)
      if (result) {
        console.log(result)
        setNetworks(result)
      } else {
        console.log(error)
        toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
      }
    }
  }

  const tabs = [
    {
      name: 'Overview',
      content: <AssetsInfoOverview />
    },
    {
      name: 'Networks',
      content: (
        <AssetsInfoNetworks
          nodes={nodes}
          toast={toast}
          networks={networks}
          assetData={assetData}
          handleFetchNetworks={handleFetchNetworks}
        />
      )
    },
    {
      name: 'Nodes', content: (
        <AssetsInfoNodes
          toast={toast}
          networks={networks}
        />
      )
    },
    {
      name: 'Policies',
      content: (
        <AssetsInfoPolicies
          toast={toast}
          networks={networks}
          assetData={assetData}
        />
      )
    },
    {
      name: 'Protocols',
      content: (
        <AssetsProtocols
          toast={toast}
          networks={networks}
          assetData={assetData}
        />
      )
    },
  ]

  useEffect(() => {
    if (asset_id) {
      handleFetchNodes()
      handleFetchNetworks()
    }
  }, [asset_id])

  return (
    <>
      <div className="mx-auto">
        {/* Tabs Navigation */}
        <SubTabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} selectIndex={true}/>

        {/* Tab Content */}
        <div className="text-sm">
          <div>{tabs[activeTab].content}</div>
        </div>
      </div>
    </>
  )
}
