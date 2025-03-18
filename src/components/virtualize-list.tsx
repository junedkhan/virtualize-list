import React, { ReactNode } from "react";

interface IVitualizedListProps {
  data: Array<any>;
  height: number;
  itemHeight: number;
  width: number;
  ItemComponent: (param: any) => ReactNode;
}

const VirtualizeList: React.FC<IVitualizedListProps> = ({
  data,
  height,
  width,
  itemHeight,
  ItemComponent,
}) => {
  const maxItems = Math.floor(height / itemHeight);
  const [activeItemIndexes, setActiveItemIndexes] = React.useState([
    0,
    maxItems,
  ]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    const startingIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = startingIndex + maxItems;

    setActiveItemIndexes([startingIndex, endIndex]);
  };

  const visbleItems = data.slice(
    activeItemIndexes[0],
    activeItemIndexes[1] + 1
  );
  return (
    <div
      onScroll={onScroll}
      style={{
        height: height,
        width: width,
        overflow: "scroll",
        position: "relative",
      }}
    >
      {" "}
      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          top: activeItemIndexes[0] * itemHeight,
          width: "100%",
        }}
      >
        {visbleItems.map((d, index) => {
          return (
            <div key={index} style={{ height: itemHeight }}>
              {ItemComponent({ data: d })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizeList;
