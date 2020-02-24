import { notification } from 'antd';



notification.config({
    placement: 'bottomRight',
    bottom: 50,
    duration: 3,
});


export const openInfoNotification = placement => {
    notification.info({
        message: "İNFO",
        description:
            'Data loaded Successfully.',
        placement,
    });
};


export const openSuccessNotification = placement => {
    notification.success({
        message: placement.message,
        description:
            placement.description,
        placement,
    });

};
export const openErrorNotification = (placement) => {
    notification.error({
        message: `ERROR`,
        description:
            `${placement.err}`,
        placement,
    });
};
