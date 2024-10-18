import { getPublishedDashboardEvents, getDraftDashboardEvents } from "@/actions";
import { DashboardEvents } from "./(components)";

const DashboardPage = async () => {
  const { events: productionEvents } = await getPublishedDashboardEvents();
  const { events: draftEvents } = await getDraftDashboardEvents();

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <DashboardEvents
        title="Published Events"
        subTitle="events list"
        events={productionEvents ?? []}
        emptyMessage="No events found"
      />
      <DashboardEvents
        title="Draft Events"
        subTitle="events on draft"
        events={draftEvents ?? []}
        emptyMessage="No events on draft"
      />
    </section>
  );
};

export default DashboardPage;