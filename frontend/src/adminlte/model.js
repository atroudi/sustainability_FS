import {List, Map, Record} from "immutable";


class AdminLTE extends Record({
    body: Map({
        classNames: List([
            "skin-green",
            "sidebar-mini",
            "sidebar-open"
        ])
    }),
    controlSidebar: Map({
        classNames: Map({
            "control-sidebar": true,
            "control-sidebar-dark": true,
            "control-sidebar-open": false
        })
    }),
    mainFooter: Map({
        height: 51
    }),
    mainHeader: Map({
        height: 50,
        userPanel: Map({
            collapsed: true
        })
    }),
    mainSidebar: Map({
        collapsed: document.body.classList.contains("sidebar-open")
    })
}){}

export {
    AdminLTE
};
