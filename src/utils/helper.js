export const capitalizeFirstLetter = (word) => {
  if (word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const urlToFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();

  /**Create a new file from the blob*/
  return new File([blob], filename, { type: blob.type });
}

export const convertImageUrlToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error('Failed to convert image to Base64'));
    };

    reader.readAsDataURL(blob);
  });
}

export const handleAssetFormValidation = (formData, assetSchema) => {
  const request = {
    name: formData.name,
    ticker: formData.ticker,
    usd_value: parseFloat(formData.usd_value),
    daily_volume: parseFloat(formData.daily_volume),
    type: formData.type,
    status: Boolean(formData.status),
    liquidity: formData.liquidity,
    country: formData.country,
    icon: formData.icon,
  };

  return assetSchema.safeParse(request)
}

export const handleAddNodeFormValidation = (formData, assetSchema) => {
  const request = {
    networkId: formData.networkId,
    name: formData.name,
    ipAddress: formData.ipAddress,
    rpcPort: formData.rpcPort,
    userName: formData.userName,
    password: formData.password,
    networkType: formData.networkType,
    webSocketAddress: formData.webSocketAddress,
    webSocketPort: formData.webSocketPort,
  };

  return assetSchema.safeParse(request)
}

export const handleAddSchemeFormValidation = (formData, assetSchema) => {
  const request = {
    fee: formData.fee,
    name: formData.name,
    endTime: formData.endTime,
    feeType: formData.feeType,
    gasPrice: formData.gasPrice,
    activity: formData.activity,
    criteria: formData.criteria,
    startTime: formData.startTime,
    gasPriceType: formData.gasPriceType,
    rules: formData.rules,
    assetType: formData.assetType,
    companyId: formData.companyId,
  };

  return assetSchema.safeParse(request)
}

export const handleAddScheduleFormValidation = (formData, assetSchema) => {
  const request = {
    rules: formData.rules,
  };

  return assetSchema.safeParse(request)
}

export const handleAddLiquidityFormValidation = (formData, assetSchema) => {
  const request = {
    name: formData.name,
    website: formData.website,
    logo: formData.logo,
  };

  return assetSchema.safeParse(request)
}

export const handleEditPolicyFormValidation = (formData, assetSchema) => {
  const request = {
    maximumBalance: formData.maximumBalance,
    minimumBalance: formData.minimumBalance,
    minimumReceiveAmount: formData.minimumReceiveAmount,
    maximumReceiveAmount: formData.maximumReceiveAmount,
    maximumTransferAmount: formData.maximumTransferAmount,
    minimumPurchaseAmount: formData.minimumPurchaseAmount,
    maximumPurchaseAmount: formData.maximumPurchaseAmount,
    minimumTransferAmmount: formData.minimumTransferAmmount,
  };

  return assetSchema.safeParse(request)
}

export const handleEditProtocolFormValidation = (formData, assetSchema) => {
  const request = {
    minimumSweepAmount: formData.minimumSweepAmount,
    maximumSweepAmount: formData.maximumSweepAmount,
    maximumEOALimit: formData.maximumEOALimit,
  };

  return assetSchema.safeParse(request)
}

export const handleEditPolicyFeeFormValidation = (formData, assetSchema) => {
  const request = {
    ReceiveFee: formData.ReceiveFee,
    purchaseFee: formData.purchaseFee,
    internalTransferFee: formData.internalTransferFee,
    externalTransferFee: formData.externalTransferFee,
  };

  return assetSchema.safeParse(request)
}

export const formatDate = (dateString) => {
  if (!dateString)  return  'xxxx-xx-xx'
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getDateRangeString = (startDate, endDate) => {
  // Convert to Date objects if strings are passed
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in days
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Calculate months difference
  const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  // Calculate years difference
  const yearDiff = end.getFullYear() - start.getFullYear();

  // Check if dates are the same
  if (diffDays === 0) {
    return 'Today';
  }

  // Check if it's yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (start.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  // Handle weekly ranges
  if (diffDays <= 7) {
    return 'Last week';
  } else if (diffDays <= 14) {
    return '2 weeks ago';
  } else if (diffDays <= 21) {
    return '3 weeks ago';
  }

  // Handle monthly ranges
  if (monthDiff === 1) {
    return 'Last month';
  } else if (monthDiff < 12) {
    return `${monthDiff} months ago`;
  }

  // Handle yearly ranges
  if (yearDiff === 1) {
    return 'Last year';
  } else {
    return `${yearDiff} years ago`;
  }
};
