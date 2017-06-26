from rest_framework import serializers
from .users.models import Profile

class ObjectSerializer(serializers.BaseSerializer):
    """
    A base serializer that coerces arbitrary complex objects
    into our serialization style:
    Variant 3 in https://github.com/vitaliyharchenko/quant/blob/vitaliy/api.json.

    Реализована основная структура. От этого класса наследуются сериализаторы всех моделей.
    В классах для конкретных моделей должны быть описаны:
        - формирование полей relationships 
        - заполнение связанных данных из relationships в include
        - определить метод 
            def create(self, validated_data):
                return ModelClassName.objects.create(**validated_data)
    """
    def to_representation(self, obj):
        _id = obj.pk
        _type = obj._meta.app_label, # может что-то другое

        output = {"api" : {"version": "1.0"},  # захардкодить и подтягивать версию откуда-нибудь из настроек
                  "data" : {
                        "meta" : {
                            obj.get_absolute_url : {
                                "loading": True,
                                "data": [
                                    {
                                        "id": _id,
                                        "type": _type ,
                                        "relationships": {}
                                    }
                                ]
                            }
                        },
                        "include" : {}
                    }
                }

        output["data"]["include"][_type] = {}
        output["data"]["include"][_type][_id] = {}
        output["data"]["include"][_type][_id]["attributes"] = {}
        output["data"]["include"][_type][_id]["relationships"] = {}

        for attribute_name in dir(obj):
            attribute = getattr(obj, attribute_name)
            # if attribute_name('_'):
            #     # Ignore private attributes.
            #     pass
            if hasattr(attribute, '__call__'):
                # Ignore methods and other callables.
                pass
            elif isinstance(attribute, (str, int, bool, float, type(None))):
                # Primitive types can be passed through unmodified.
                output["data"]["include"][_type][_id]["attributes"][attribute_name] = attribute
            else:
                # Force anything else to its string representation.
                output["data"]["include"][_type][_id]["attributes"][attribute_name] = str(attribute)
        return output

    def to_inital_value(self, data):
        pass
