import { createI18n } from "vue-i18n";

const numberFormats: any = {
    'en-US': {
        currency: {
            style: 'currency', currency: 'USD', notation: 'standard'
        },
        decimal: {
            style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
        },
        percent: {
            style: 'percent', useGrouping: false
        }
    },
    'zh-CN': {
        currency: {
            style: 'currency', currency: 'CNY', useGrouping: true, currencyDisplay: 'symbol'
        },
        decimal: {
            style: 'decimal', minimumSignificantDigits: 3, maximumSignificantDigits: 5
        },
        percent: {
            style: 'percent', useGrouping: false
        }
    }
};

export default createI18n({
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
    numberFormats,
    messages: {
        'en-US': {
            message: {
                search_tip: 'Search Product, Total {subtotal} Products'
            }
        },
        'zh-CN': {
            message: {
                search_tip: '搜索商品, 共{subtotal}款好物'
            }
        }
    }
});