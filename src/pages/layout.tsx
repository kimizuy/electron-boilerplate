import { View } from "@adobe/react-spectrum";
import { Outlet } from "react-router-dom";

export function Layout(): JSX.Element {
  return (
    <View id="detail" minHeight="100vh" padding="size-600">
      <Outlet />
    </View>
  );
}
