import api from "../api";

export const renderEventContent = (eventInfo) => {
    const startShift = new Date(eventInfo.event.extendedProps.start_shift).toLocaleString();
    const endShift = new Date(eventInfo.event.extendedProps.end_shift).toLocaleString();
    return (
      <div>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <p>Category: {eventInfo.event.extendedProps.category}</p>
        <p>Start Shift: {startShift}</p>
        <p>End Shift: {endShift}</p>
        <p>Date Request: {eventInfo.event.extendedProps.date_request}</p>
        <p>Remarks: {eventInfo.event.extendedProps.remarks}</p>
      </div>
    );
  };

export  const handleEventChange = async (changeInfo) => {
    const updatedEvent = {
      id: changeInfo.event.id,
      category: changeInfo.event._def.extendedProps.category,
      date_request: changeInfo.event._def.extendedProps.date_request,
      end_shift: changeInfo.event._instance.range.end,
      reason: changeInfo.event._def.extendedProps.reason,
      remarks: changeInfo.event._def.extendedProps.remarks,
      start_shift: changeInfo.event._instance.range.start
    };
    
    await api.patch(`/api/absent-requests/update/${updatedEvent.id}/`, updatedEvent);

  };

  export const handleCreateRequest = (newRequest, changeData) => {
    const transformedRequest = {
      title: newRequest.reason,
      start: newRequest.start_shift,
      end: newRequest.end_shift,
      extendedProps: {
        category: newRequest.category,
        date_request: newRequest.date_request,
        end_shift: newRequest.end_shift,
        reason: newRequest.reason,
        remarks: newRequest.remarks,
        start_shift: newRequest.start_shift
      }
    };
    changeData((prevRequests) => [...prevRequests, transformedRequest]);
  };

