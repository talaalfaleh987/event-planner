import { TranslateService } from '@ngx-translate/core';
import { PieChartItem } from '../../../../models/charts/events-pie-charts-data';
import { PieChartType } from '../../../../enums/charts.enum';

export const pieChartConfig = (
    data: PieChartItem[],
    title: string,
    type: PieChartType,
    translate: TranslateService,
    total: number
) => {
    const getPercentage = (value: number, total: number): number => {
        if (!total) return 0;
        return Math.round((value / total) * 100);
    };
    if (type === PieChartType.SUMMARY) {
        const item = data[0];
        const percent = getPercentage(item.value, total);
        if (!item) {
            return {
                series: []
            };
        }
        return {
            tooltip: { show: false },
            series: [
                {
                    type: 'pie',
                    radius: ['75%', '90%'],
                    center: ['50%', '50%'],
                    label: {
                        show: true,
                        position: 'center',
                        formatter: () => {
                            return `{a|${percent}%}\n{b|${title}}`;
                        },
                        rich: {
                            a: {
                                fontSize: 12,
                                color: '#000',
                                fontFamily: 'Neo Sans Regular'
                            },
                            b: {
                                fontSize: 14,
                                color: '#000',
                                fontFamily: 'Neo Sans Regular'
                            }
                        }
                    },
                    data: [
                        {
                            value: percent,
                            itemStyle: {
                                color: item.itemStyle?.color || '#77c6a9'
                            }
                        },
                        {
                            value: 100 - percent,
                            itemStyle: {
                                color: `${item.itemStyle?.color || '#77c6a9'}33`
                            }

                        }
                    ]
                }
            ]
        };
    }
    return {
        tooltip: { trigger: 'item' },
        legend: {
            top: '40%',
            left: 'right',
            orient: 'horizontal',
            icon: 'rect',
            itemWidth: 6,
            itemHeight: 55,
            itemGap: 70,
            textStyle: {
                rich: {
                    value: {
                        fontSize: 14,
                        fontFamily: 'Neo Sans Regular',
                        color: '#000',
                    },
                    name: {
                        fontSize: 12,
                        fontFamily: 'Neo Sans Regular',
                        color: '#000',
                    },
                    percentage: {
                        fontSize: 12,
                        fontFamily: 'Neo Sans Regular',
                        color: '#000',
                    }
                }
            },
            formatter: (name: string) => {
                const item = data.find(d => d.name === name);
                if (!item) return name;

                const translatedName = translate.instant(`EVENTS.${name}`);
                const totalValue = data.reduce((sum, d) => sum + d.value, 0);
                const percentage = getPercentage(item.value, totalValue);

                return `{value|${item.value}}\n{name|${translatedName}}\n\n\n{percentage|${percentage}%}`;
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['30%', '45%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false
                },
                data: data.map(d => ({
                    value: d.value,
                    name: d.name,
                    itemStyle: { color: d.itemStyle?.color }
                }))
            }
        ]
    }
};