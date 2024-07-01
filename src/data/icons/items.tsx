
export default function GetTreeLogo(treeType: string) {
    switch (treeType) {
      case "Tree":
        return <NormalTreeLogo />;
      case "Oak Tree":
        return <OakTreeLogo />;
      case "Willow Tree":
        return <WillowTreeLogo />;
      case "Maple Tree":
        return <MapleTreeLogo />;
      case "Yew Tree":
        return <YewTreeLogo />;
      case "Magic Tree":
        return <MagicTreeLogo />;
      default:
        return <NormalTreeLogo />;
    }
  
}
const BACKGROUND_COLOR = "#8D99AE"
export const NormalTreeLogo = () => {
    return (
        <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <rect width="100" height="100" fill={BACKGROUND_COLOR} />
        <rect x="45" y="60" width="10" height="30" fill="#8B4513" />
        <circle cx="50" cy="40" r="25" fill="#228B22" />
        </svg>
    );
}

export const OakTreeLogo = () => {
    return (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" fill={BACKGROUND_COLOR} />
        <rect x="42" y="60" width="16" height="30" fill="#8B4513" />
        <circle cx="50" cy="35" r="30" fill="#228B22" />
      </svg>
    );
  };

export const WillowTreeLogo = () => {
    return (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" fill={BACKGROUND_COLOR} />
        <rect x="45" y="60" width="10" height="30" fill="#8B4513" />
        <ellipse cx="50" cy="35" rx="25" ry="35" fill="#228B22" />
      </svg>
    );
  };

export const MapleTreeLogo = () => {
    return (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" fill={BACKGROUND_COLOR} />
        <rect x="45" y="60" width="10" height="30" fill="#8B4513" />
        <circle cx="50" cy="40" r="25" fill="#D2691E" />
      </svg>
    );
  };

export const YewTreeLogo = () => {
    return (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" fill={BACKGROUND_COLOR} />
        <rect x="45" y="45" width="10" height="45" fill="#8B4513" />
        <polygon points="50,10 20,50 80,50" fill="#228B22" />
      </svg>
    );
  };

export const MagicTreeLogo = () => {
    return (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" fill={BACKGROUND_COLOR} />
        <rect x="45" y="60" width="10" height="30" fill="#8B4513" />
        <circle cx="50" cy="40" r="25" fill="#9370DB" />
        <circle cx="35" cy="25" r="5" fill="#FFD700" />
        <circle cx="65" cy="25" r="5" fill="#FFD700" />
        <circle cx="50" cy="55" r="5" fill="#FFD700" />
      </svg>
    );
  };