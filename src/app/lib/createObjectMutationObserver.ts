import DeepProxy from 'proxy-deep';

export function createObjectMutationObserver<O extends object>(
    prevObj: O,
    params: {
        onMutation?: (obj: O) => void;
    }
) {
    const createNextObj = () => new DeepProxy(prevObj, handler() as any);

    function handler(): ProxyHandler<O> {
        return {
            get: function (target, prop) {
                //@ts-ignore
                const value = target[prop];
                const valueType = Object.prototype.toString.call(value);
                const isObject = ['[object Object]', '[object Array]'].includes(valueType);

                if (isObject) {
                    return new DeepProxy(value, handler() as any);
                }

                return value;
            },
            set: function (target, prop, value) {
                //@ts-ignore
                target[prop] = value;

                if (params.onMutation) {
                    const nextObj = createNextObj();
                    params.onMutation(nextObj);
                }

                return true;
            }
        };
    }

    return createNextObj();
}
