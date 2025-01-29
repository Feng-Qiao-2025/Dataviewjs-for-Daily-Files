let targetDate = input.targetDate;
let isCreate = input.isCreate;
let undefinedPropertiesFiles = input.undefinedPropertiesFiles;
let currentFileFilter = input.currentFileFilter;
let currentFilePath = input.currentFilePath;
let contentDisplaySwitch = input.contentDisplaySwitch;
let conciseDisplaySwitch = input.conciseDisplaySwitch;
let timeInfoSimplifySwitch = input.timeInfoSimplifySwitch;
let sortSwitch = input.sortSwitch;
let timeSystemSwitch = input.timeSystemSwitch;
let languageSwitch = input.languageSwitch;
let tableData = input.tableData;
let isFound = input.isFound;
let excludedFolders = input.excludedFolders;

let excludeTargetDateSwitch = input.excludeTargetDateSwitch;

// 额外的不检索文件夹名称数组，根据个人需求修改。
// The additional array of folder names to exclude is customizable based on personal needs.
const additionalExcludeFolders = [
    "_attachment",
    "_excalidraw",
    "_template",
    "Excalidraw"
];

const combinedExcludeFolders = excludedFolders.concat(additionalExcludeFolders);

const files = dv.pages();

files.forEach(file => {
    if (!file) return null;

    try {
        const filePath = file.file.path;
        const isExcluded = combinedExcludeFolders.some(excludeFolder => {
            const regex = new RegExp(excludeFolder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(/|$)', 'g');
            return regex.test(filePath);
        });

        if (!isExcluded) {
            const ctime = file.file.ctime;
            const mtime = file.file.mtime;

            const dateStr = file.file.frontmatter.date;
            const updateStr = file.file.frontmatter.update;

            const cleanDateStr = (dateStr) => {
                if (!dateStr) return null;
                const cleanedStr = dateStr.replace(/-星期[一至日]/, '');
                const [datePart, timePart] = cleanedStr.split(' ');
                const [year, month, day] = datePart.split('-');
                const [hour, minute, second] = timePart.split(':');
                return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
            };

            const cleanedDateStr = cleanDateStr(dateStr);
            const cleanedUpdateStr = cleanDateStr(updateStr);

            const formatDate = (date) => {
                if (date === null) return '未定义';
                return new Date(date).toLocaleString();
            };

            const manualCreateTime = cleanedDateStr ? formatDate(cleanedDateStr) : '';
            const autoCreateTime = formatDate(ctime);

            const manualUpdateTime = cleanedUpdateStr ? formatDate(cleanedUpdateStr) : '';
            const autoUpdateTime = formatDate(mtime);

            let autoCreateTimeToConsider = autoCreateTime;
            if (new Date(ctime) > new Date(mtime)) {
                autoCreateTimeToConsider = '';
            }

            if (manualCreateTime && autoCreateTime && manualUpdateTime && new Date(manualUpdateTime) < new Date(autoCreateTime)) {
                autoCreateTimeToConsider = '';
            }

            const isMatchDate = (dateStr) => {
                if (!dateStr) return false;
                const date = new Date(dateStr);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day}` === targetDate;
            };

            let isMatch;
            if (isCreate) {
                isMatch = isMatchDate(manualCreateTime) || isMatchDate(autoCreateTimeToConsider);
            } else {
                isMatch = isMatchDate(manualUpdateTime) || isMatchDate(autoUpdateTime);
            }

            const isMissingInfo = !manualCreateTime || !autoCreateTime || !manualUpdateTime || !autoUpdateTime;

            if (isMatch) {
                isFound = true;
                if (currentFileFilter && file.file.path === currentFilePath && !isMissingInfo) {
                    return;
                }

                let fileLink = `[[${file.file.name}]]`;
                if (isMissingInfo) {
                    fileLink = `**==[[${file.file.name}]]==**`;
                }

                let timeInfo;
                let sortTimeInfo;
                if (contentDisplaySwitch) {
                    if (conciseDisplaySwitch) {
                        timeInfo = manualCreateTime || autoCreateTimeToConsider;
                    } else {
                        timeInfo = `手动储存 - ${manualCreateTime}, 自动生成 - ${autoCreateTimeToConsider}`;
                    }
                } else {
                    if (conciseDisplaySwitch) {
                        timeInfo = autoUpdateTime;
                    } else {
                        timeInfo = `手动储存 - ${manualUpdateTime}, 自动生成 - ${autoUpdateTime}`;
                    }
                }

                if (conciseDisplaySwitch) {
                    if (timeInfoSimplifySwitch) {
                        timeInfo = new Date(timeInfo).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
                        sortTimeInfo = new Date(timeInfo).toISOString().split('T')[0];
                        if (excludeTargetDateSwitch && timeInfo === targetDate.replace(/-/g, '.')) {
                            return;
                        }
                    } else {
                        const time24 = new Date(timeInfo).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
                        sortTimeInfo = `1970-01-01T${time24}`;

                        if (timeSystemSwitch) {
                            timeInfo = time24;
                        } else {
                            const date = new Date(timeInfo);
                            const hour = date.getHours();
                            const minute = date.getMinutes().toString().padStart(2, '0');
                            const ampm = hour >= 12 ? 'PM' : 'AM';
                            const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
                            let timePeriod = '';
                            if (hour >= 0 && hour < 6) {
                                timePeriod = '凌晨';
                            } else if (hour >= 6 && hour < 12) {
                                timePeriod = '上午';
                            } else if (hour === 12) {
                                timePeriod = '中午';
                            } else if (hour > 12 && hour < 18) {
                                timePeriod = '下午';
                            } else {
                                timePeriod = '晚上';
                            }
                            if (languageSwitch) {
                                timeInfo = `${formattedHour.toString().padStart(2, '0')}:${minute} ${timePeriod}`;
                            } else {
                                timeInfo = `${formattedHour.toString().padStart(2, '0')}:${minute}${ampm}`;
                            }
                        }
                    }
                } else {
                    sortTimeInfo = timeInfo;
                }

                tableData.push([fileLink, timeInfo, sortTimeInfo]);
            }
        }
    } catch (error) {
        console.error(`处理文件 ${file.file.name} 时出现错误：${error.message}`);
        if (error.message.includes("Cannot read properties of undefined (reading 'split')")) {
            undefinedPropertiesFiles.push(`**==[[${file.file.name}]]==**`);
        } else {
            throw error;
        }
    }
});

if (conciseDisplaySwitch) {
    tableData.sort((a, b) => {
        const timeA = new Date(a[2]);
        const timeB = new Date(b[2]);
        if (timeA.getTime() === timeB.getTime()) {
            return a[0].localeCompare(b[0]);
        }
        return sortSwitch ? timeA.getTime() - timeB.getTime() : timeB.getTime() - timeA.getTime();
    });
}

if (tableData.length === 0) {
    const action = isCreate ? "创建" : "修改";
    dv.paragraph(`> [!info] 没有找到在 ${targetDate} ${action} 的文件。`);
} else {
    if (isFound) {
        dv.paragraph(`> [!success] 找到匹配项，以下是查询结果：`);
    } else {
        const action = isCreate ? "创建" : "修改";
        dv.paragraph(`> [!info] 没有找到在 ${targetDate} ${action} 的文件。`);
    }

    dv.table(["文件链接", ""], tableData.map(item => [item[0], item[1]]));
}

if (undefinedPropertiesFiles.length > 0) {
    dv.paragraph(`> [!bug] Undefined Properties 错误！文件名称为：${undefinedPropertiesFiles.join('、')}`);
}