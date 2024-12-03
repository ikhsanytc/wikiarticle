import { Children, Fragment, ReactNode } from "react";

interface Props<T> {
  of: T[];
  render: (item: T, index: number) => ReactNode;
}

const EachUtils = <T,>({ render, of }: Props<T>) => {
  if (of.length == 0) {
    return <div>data kosong</div>;
  }
  return Children.toArray(
    of.map((item, idx) => <Fragment key={idx}>{render(item, idx)}</Fragment>)
  );
};

export default EachUtils;
